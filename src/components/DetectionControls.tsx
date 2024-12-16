import React from 'react';
import { Camera, Power } from 'lucide-react';

interface DetectionControlsProps {
  isDetecting: boolean;
  onToggleDetection: () => void;
  isInitialized: boolean;
}

export const DetectionControls: React.FC<DetectionControlsProps> = ({
  isDetecting,
  onToggleDetection,
  isInitialized
}) => {
  return (
    <div className="flex justify-center gap-4 my-4">
      <button
        onClick={onToggleDetection}
        disabled={!isInitialized}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-lg font-medium
          transition-colors duration-200
          ${isDetecting
            ? 'bg-red-500 hover:bg-red-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
          }
          ${!isInitialized && 'opacity-50 cursor-not-allowed'}
        `}
      >
        {isDetecting ? (
          <>
            <Power size={20} />
            Stop Detection
          </>
        ) : (
          <>
            <Camera size={20} />
            Start Detection
          </>
        )}
      </button>
    </div>
  );
};