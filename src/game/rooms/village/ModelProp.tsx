'use client';

import { useMemo } from 'react';
import { Box3, Vector3, type Vector3Tuple } from 'three';
import { useGLTF, Clone } from '@react-three/drei';

export interface ModelPropProps {
  /** Path under /public, e.g. '/models/village/well.glb'. */
  readonly url: string;
  /** Target size (m) of the model's largest dimension — normalizes any source scale. */
  readonly maxDim: number;
  readonly position: Vector3Tuple;
  readonly rotationY?: number;
  readonly scale?: number;
}

/**
 * Renders a .glb prop normalized to a known size and seated on the ground (y=0),
 * regardless of the source asset's scale/origin. drei <Clone> shares geometries
 * across repeated instances.
 */
export function ModelProp({ url, maxDim, position, rotationY = 0, scale = 1 }: ModelPropProps): React.JSX.Element {
  const { scene } = useGLTF(url);
  const { fit, offset } = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = new Vector3();
    box.getSize(size);
    const center = new Vector3();
    box.getCenter(center);
    const largest = Math.max(size.x, size.y, size.z) || 1;
    const off: Vector3Tuple = [-center.x, -box.min.y, -center.z];
    return { fit: maxDim / largest, offset: off };
  }, [scene, maxDim]);

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={fit * scale}>
      <Clone object={scene} position={offset} castShadow receiveShadow />
    </group>
  );
}
