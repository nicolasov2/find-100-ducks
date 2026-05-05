'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier';
import type { RapierRigidBody } from '@react-three/rapier';
import type { Ray } from '@dimforge/rapier3d-compat';
import { Vector3 } from 'three';
import { useKeyboard } from '@/game/hooks/useKeyboard';
import { playFootstep } from '@/game/systems/AudioManager';

const WALK_SPEED = 4;
const JUMP_IMPULSE = 6.5;
const JUMP_COOLDOWN_MS = 250;
const HORIZONTAL_DAMPING = 0.86;
const FOOTSTEP_INTERVAL_MS = 350;
const EYE_HEIGHT_OFFSET = 0.7;
const CAPSULE_HALF_HEIGHT = 0.45;
const CAPSULE_RADIUS = 0.4;
const CAPSULE_HALF_TOTAL = CAPSULE_HALF_HEIGHT + CAPSULE_RADIUS;
const GROUND_RAY_TOI_MAX = CAPSULE_HALF_TOTAL + 0.1;
const GROUND_RAY_TOI_THRESHOLD = CAPSULE_HALF_TOTAL + 0.05;
const SPAWN: readonly [number, number, number] = [0, 1.5, 0];

const forwardVec = new Vector3();
const rightVec = new Vector3();
const moveVec = new Vector3();
const UP_VEC = new Vector3(0, 1, 0);

export function Player(): React.JSX.Element {
  const bodyRef = useRef<RapierRigidBody>(null);
  const lastJumpAtRef = useRef<number>(0);
  const lastFootstepAtRef = useRef<number>(0);
  const groundRayRef = useRef<Ray | null>(null);
  const keys = useKeyboard();
  const camera = useThree((s) => s.camera);
  const { rapier, world } = useRapier();

  useFrame((_, delta) => {
    const body = bodyRef.current;
    if (!body) return;
    if (groundRayRef.current === null) {
      groundRayRef.current = new rapier.Ray(
        { x: 0, y: 0, z: 0 },
        { x: 0, y: -1, z: 0 },
      );
    }
    const groundRay = groundRayRef.current;

    const pressed = keys.current;

    camera.getWorldDirection(forwardVec);
    forwardVec.y = 0;
    if (forwardVec.lengthSq() < 1e-6) {
      forwardVec.set(0, 0, -1);
    }
    forwardVec.normalize();
    rightVec.copy(forwardVec).cross(UP_VEC).normalize();

    moveVec.set(0, 0, 0);
    if (pressed.has('w')) moveVec.add(forwardVec);
    if (pressed.has('s')) moveVec.sub(forwardVec);
    if (pressed.has('d')) moveVec.add(rightVec);
    if (pressed.has('a')) moveVec.sub(rightVec);

    if (moveVec.lengthSq() > 0) {
      moveVec.normalize().multiplyScalar(WALK_SPEED);
    }

    const linvel = body.linvel();
    if (moveVec.lengthSq() > 0) {
      body.setLinvel({ x: moveVec.x, y: linvel.y, z: moveVec.z }, true);
    } else {
      const decay = Math.pow(HORIZONTAL_DAMPING, delta * 60);
      body.setLinvel(
        { x: linvel.x * decay, y: linvel.y, z: linvel.z * decay },
        true,
      );
    }

    const t = body.translation();
    groundRay.origin.x = t.x;
    groundRay.origin.y = t.y;
    groundRay.origin.z = t.z;
    const hit = world.castRay(
      groundRay,
      GROUND_RAY_TOI_MAX,
      true,
      undefined,
      undefined,
      undefined,
      body,
    );
    const grounded = hit !== null && hit.timeOfImpact <= GROUND_RAY_TOI_THRESHOLD;

    if (grounded && moveVec.lengthSq() > 0) {
      const now = performance.now();
      if (now - lastFootstepAtRef.current > FOOTSTEP_INTERVAL_MS) {
        playFootstep();
        lastFootstepAtRef.current = now;
      }
    }

    if (grounded && pressed.has(' ')) {
      const now = performance.now();
      if (now - lastJumpAtRef.current > JUMP_COOLDOWN_MS) {
        body.applyImpulse({ x: 0, y: JUMP_IMPULSE, z: 0 }, true);
        lastJumpAtRef.current = now;
      }
    }

    camera.position.set(t.x, t.y + EYE_HEIGHT_OFFSET, t.z);
  });

  return (
    <RigidBody
      ref={bodyRef}
      type="dynamic"
      colliders={false}
      position={SPAWN}
      mass={1}
      linearDamping={0}
      lockRotations
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[CAPSULE_HALF_HEIGHT, CAPSULE_RADIUS]} />
    </RigidBody>
  );
}
