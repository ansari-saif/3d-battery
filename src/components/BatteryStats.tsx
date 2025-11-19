import React from 'react';
import { Battery as BatteryIcon, Zap, Clock } from 'lucide-react';

interface BatteryStatsProps {
  charge: number;
  voltage: number;
  temperature: number;
  timeRemaining: string;
}

export function BatteryStats({ charge, voltage, temperature, timeRemaining }: BatteryStatsProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg w-80">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BatteryIcon className="w-6 h-6" />
        Battery Status
      </h2>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Charge Level</span>
            <span className="font-semibold">{charge}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="h-2.5 rounded-full transition-all duration-500"
              style={{
                width: `${charge}%`,
                backgroundColor: charge > 50 ? '#4CAF50' : charge > 20 ? '#FFC107' : '#F44336'
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Voltage
          </span>
          <span className="font-semibold">{voltage.toFixed(1)}V</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Temperature</span>
          <span className="font-semibold">{temperature}°C</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time Remaining
          </span>
          <span className="font-semibold">{timeRemaining}</span>
        </div>
      </div>
    </div>
  );
}