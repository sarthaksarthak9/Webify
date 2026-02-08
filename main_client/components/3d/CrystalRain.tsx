'use client';

import React, { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';

import { FEATURES } from './features';


function Crystal({ feature, onSelect, position, speed, rotationSpeed, side }: any) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const textRef = useRef<THREE.Group>(null!);
    const { viewport } = useThree();

    // Internal state for the current feature to allow rotation
    const [activeFeature, setActiveFeature] = useState(feature);

    // Random initial position if not provided
    const initialY = position ? position[1] : viewport.height / 2 + Math.random() * 5;
    const x = position ? position[0] : (side === 'left' ? -1 : 1) * (3.5 + Math.random() * 4);
    const z = position ? position[2] : (Math.random() - 0.5) * 5;

    const [y, setY] = useState<number>(initialY);

    useFrame((state, delta) => {
        // Fall animation
        setY((prev) => {
            let newY = prev - speed * delta;
            if (newY < -viewport.height / 2 - 2) {
                newY = viewport.height / 2 + 2;
                // Reset X to specific side logic
                const xOffset = 3.5 + Math.random() * 4; // Keep outside center
                meshRef.current.position.x = side === 'left' ? -xOffset : xOffset;

                // Switch to a new random feature on reset
                let nextIndex = Math.floor(Math.random() * FEATURES.length);
                // Simple check to try and avoid immediate repeat if possible
                if (FEATURES[nextIndex].title === activeFeature.title) {
                    nextIndex = (nextIndex + 1) % FEATURES.length;
                }
                setActiveFeature(FEATURES[nextIndex]);
            }
            return newY;
        });

        if (meshRef.current) {
            meshRef.current.position.y = y;
            meshRef.current.rotation.x += rotationSpeed.x * delta;
            meshRef.current.rotation.y += rotationSpeed.y * delta;

            // Sync text position/rotation
            if (textRef.current) {
                textRef.current.position.copy(meshRef.current.position);
                // Make text look at camera but follow cube position
                textRef.current.quaternion.copy(state.camera.quaternion);
            }
        }
    });

    return (
        <group>
            <mesh
                ref={meshRef}
                position={[x, initialY, z]}
                onClick={() => onSelect(activeFeature)}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'auto'}
            >
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <MeshTransmissionMaterial
                    backside
                    thickness={0.5}
                    roughness={0.1}
                    transmission={1}
                    ior={1.5}
                    chromaticAberration={0.1}
                    background={new THREE.Color('#0B0E14')}
                    resolution={512} // Reduced resolution for performance
                    samples={6}      // Reduced samples
                />
            </mesh>
            <group ref={textRef} position={[x, initialY, z]}>
                <Text
                    position={[0, 0.2, 0]}
                    fontSize={0.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.01}
                    outlineColor="#000000"
                >
                    {activeFeature.shortTitle}
                </Text>
                <Text
                    position={[0, -0.1, 0]}
                    fontSize={0.1}
                    color="#A7C7E7"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.005}
                    outlineColor="#000000"
                >
                    {activeFeature.icon}
                </Text>
            </group>
        </group>
    );
}



function CrystalRainComponent({ onOpenModal }: { onOpenModal: (feature: any) => void }) {
    const count = 2; // Fixed at 2
    const crystals = useMemo(() => {
        return new Array(count).fill(0).map((_, i) => {
            // Strictly one left, one right
            const side = i % 2 === 0 ? 'left' : 'right';
            const xOffset = 3.5 + Math.random() * 4;
            const x = side === 'left' ? -xOffset : xOffset;

            return {
                feature: FEATURES[i % FEATURES.length],
                speed: 0.5 + Math.random() * 1.5,
                rotationSpeed: {
                    x: Math.random() - 0.5,
                    y: Math.random() - 0.5
                },
                side, // Pass side to object
                position: [
                    x,
                    10 + Math.random() * 10,
                    (Math.random() - 0.5) * 5
                ]
            };
        });
    }, []);

    return (
        <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
            <Canvas dpr={1} camera={{ position: [0, 0, 10], fov: 45 }} className="pointer-events-auto" gl={{ antialias: false }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={1} />

                <Suspense fallback={null}>
                    {crystals.map((data, i) => (
                        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={1}>
                            <Crystal
                                feature={data.feature}
                                speed={data.speed}
                                rotationSpeed={data.rotationSpeed}
                                position={data.position}
                                side={data.side} // Pass side prop
                                onSelect={onOpenModal}
                            />
                        </Float>
                    ))}
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}

const CrystalRain = React.memo(CrystalRainComponent);
export default CrystalRain;
