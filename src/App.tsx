import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { Battery } from './components/Battery';
import { BatteryStats } from './components/BatteryStats';

function App() {
  const [batteryStats, setBatteryStats] = useState({
    charge: 85,
    voltage: 3.7,
    temperature: 25,
    timeRemaining: '4h 30m'
  });

  // Simulate battery discharge
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryStats(prev => ({
        ...prev,
        charge: Math.max(0, prev.charge - 0.1),
        voltage: 3.7 + (Math.random() * 0.2 - 0.1),
        temperature: 25 + (Math.random() * 2 - 1),
        timeRemaining: `${Math.floor(prev.charge / 20)}h ${Math.floor((prev.charge % 20) * 3)}m`
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* 3D Scene */}
      <div className="flex-1">
        <Canvas shadows camera={{ position: [3, 2, 4], fov: 50 }}>
          <PerspectiveCamera makeDefault position={[3, 2, 4]} />
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI * 3/4}
            minDistance={3}
            maxDistance={8}
          />
          
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          {/* Environment and Shadows */}
          <Environment preset="apartment" />
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.35}
            scale={10}
            blur={2.5}
            far={4}
          />
          
          {/* Battery */}
          <Battery charge={batteryStats.charge} />
        </Canvas>
      </div>

      {/* Stats Panel */}
      <div className="w-96 p-8 flex items-center">
        <BatteryStats {...batteryStats} />
      </div>
    </div>
  );
}

export default App;