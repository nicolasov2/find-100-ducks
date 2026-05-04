'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import type { RapierRigidBody } from '@react-three/rapier';
import { Vector3 } from 'three';
import { useKeyboard } from '@/game/hooks/useKeyboard';

const WALK_SPEED = 4;
const EYE_HEIGHT_OFFSET = 0.7;
const CAPSULE_HALF_HEIGHT = 0.45;
const CAPSULE_RADIUS = 0.4;
const SPAWN: readonly [number, number, number] = [0, 1.5, 0];

const forwardVec = new Vector3();
const rightVec = new Vector3();
const moveVec = new Vector3();
const UP_VEC = new Vector3(0, 1, 0);

export function Player(): React.JSX.Element {
  const bodyRef = useRef<RapierRigidBody>(null);
  const keys = useKeyboard();
  const camera = useThree((state) => state.camera);

  useFrame(() => {
    const body = bodyRef.current;
    if (!body) return;

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

    const currentLinvel = body.linvel();
    body.setLinvel(
      { x: moveVec.x, y: currentLinvel.y, z: moveVec.z },
      true,
    );

    const translation = body.translation();
    camera.position.set(
      translation.x,
      translation.y + EYE_HEIGHT_OFFSET,
      translation.z,
    );
  });

  return (
    <RigidBody
      ref={bodyRef}
      type="dynamic"
      colliders={false}
      position={SPAWN}
      mass={1}
      linearDamping={4}
      lockRotations
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[CAPSULE_HALF_HEIGHT, CAPSULE_RADIUS]} />
    </RigidBody>
  );
}
