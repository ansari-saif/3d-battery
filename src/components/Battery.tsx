import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Box, RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Mesh, Group } from 'three';

interface BatteryProps {
  charge: number;
}

export function Battery({ charge }: BatteryProps) {
  const batteryRef = useRef<Group>(null);
  const energyRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);
  const rotationRef = useRef(0);

  useFrame((state) => {
    if (batteryRef.current && energyRef.current && glowRef.current) {
      // Smooth automatic rotation
      rotationRef.current += 0.005;
      batteryRef.current.rotation.y = rotationRef.current;
      
      // Gentle floating animation
      batteryRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      // Update energy level visualization with smooth animation
      const targetScale = THREE.MathUtils.lerp(0.1, 1, charge / 100);
      energyRef.current.scale.y = THREE.MathUtils.lerp(
        energyRef.current.scale.y,
        targetScale,
        0.05
      );
      
      // Dynamic glow effect based on charge
      const pulseIntensity = charge > 20 ? 0.2 : 0.4;
      const pulseSpeed = charge > 20 ? 2 : 4;
      const glowIntensity = (Math.sin(state.clock.elapsedTime * pulseSpeed) * pulseIntensity) + 0.8;
      glowRef.current.material.opacity = glowIntensity * (charge / 100) * 0.4;
    }
  });

  const getChargeColor = (charge: number) => {
    if (charge > 60) return "#4CAF50";
    if (charge > 30) return "#FFC107";
    return "#F44336";
  };

  // Lease information text components
  const LeaseText = ({ text, rotation }: { text: string, rotation: number }) => (
    <group rotation={[0, rotation, 0]}>
      <Text
        position={[0, 0.4, 0.62]}
        fontSize={0.12}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        maxWidth={1}
      >
        {text}
      </Text>
    </group>
  );

  return (
    <group ref={batteryRef}>
      {/* Battery casing */}
      <group>
        {/* Main body */}
        <RoundedBox args={[1.2, 2.4, 1.2]} radius={0.1}>
          <meshPhysicalMaterial
            color="#444"
            metalness={0.8}
            roughness={0.2}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </RoundedBox>

        {/* Lease Information on all sides */}
        <LeaseText text="LEASEDYS" rotation={0} />
        <LeaseText text="LEASECAH" rotation={Math.PI / 2} />
        <LeaseText text="LEASEDAH" rotation={Math.PI} />
        <LeaseText text="START" rotation={-Math.PI / 2} />

        {/* Terminal details */}
        <group position={[0, 1.3, 0]}>
          {/* Positive terminal */}
          <Cylinder args={[0.3, 0.3, 0.2, 32]}>
            <meshPhysicalMaterial
              color="#888"
              metalness={0.9}
              roughness={0.1}
              clearcoat={0.5}
            />
          </Cylinder>
          <Cylinder args={[0.2, 0.2, 0.1, 32]} position={[0, 0.15, 0]}>
            <meshPhysicalMaterial color="#999" metalness={1} roughness={0.1} />
          </Cylinder>
          
          {/* Terminal label */}
          <Text
            position={[0, 0.2, 0.2]}
            fontSize={0.15}
            color="#fff"
            anchorX="center"
            anchorY="middle"
          >
            +
          </Text>
        </group>

        {/* Bottom details */}
        <group position={[0, -1.2, 0]}>
          <Cylinder args={[0.4, 0.4, 0.1, 32]}>
            <meshPhysicalMaterial color="#555" metalness={0.7} roughness={0.3} />
          </Cylinder>
          
          {/* Negative terminal label */}
          <Text
            position={[0, -0.1, 0.2]}
            fontSize={0.15}
            color="#fff"
            anchorX="center"
            anchorY="middle"
          >
            -
          </Text>
        </group>

        {/* Battery percentage */}
        <Text
          position={[0, 0, 0.62]}
          fontSize={0.2}
          color="#fff"
          anchorX="center"
          anchorY="middle"
          rotation={[0, 0, 0]}
        >
          {`${Math.round(charge)}%`}
        </Text>
      </group>

      {/* Energy visualization */}
      <group position={[0, -0.5, 0]}>
        {/* Inner energy cylinder */}
        <mesh ref={energyRef}>
          <cylinderGeometry args={[0.4, 0.4, 2, 32]} />
          <meshPhysicalMaterial
            color={getChargeColor(charge)}
            transparent
            opacity={0.9}
            emissive={getChargeColor(charge)}
            emissiveIntensity={charge > 20 ? 0.5 : charge > 10 ? 1 : 2}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>

        {/* Glow effect */}
        <mesh ref={glowRef} scale={1.2}>
          <cylinderGeometry args={[0.45, 0.45, 2.1, 32]} />
          <meshBasicMaterial
            color={getChargeColor(charge)}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Charge level indicators */}
      {[0, 25, 50, 75, 100].map((level) => (
        <group key={level} position={[0.62, -1 + (level / 50), 0]} rotation={[0, -Math.PI / 2, 0]}>
          <Box args={[0.01, 0.1, 0.1]}>
            <meshStandardMaterial 
              color={charge >= level ? getChargeColor(charge) : "#666"}
              emissive={charge >= level ? getChargeColor(charge) : "#000"}
              emissiveIntensity={charge >= level ? 0.5 : 0}
            />
          </Box>
        </group>
      ))}
    </group>
  );
}