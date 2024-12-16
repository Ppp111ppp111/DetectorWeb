import React from 'react';
import type { DetectionWithTimestamp } from '../../types/detection';
import { formatTimestamp } from '../../utils/date';

interface DetectionHistoryProps {
  detections: DetectionWithTimestamp[];
}

export const DetectionHistory: React.FC<DetectionHistoryProps> = ({ detections }) => {
  if (detections.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No detections yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {detections.map((detection, index) => (
        <div
          key={`${detection.class}-${detection.timestamp}-${index}`}
          className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">
              {detection.class}
            </span>
            <span className="text-sm text-gray-500">
              ({Math.round(detection.score * 100)}%)
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {formatTimestamp(detection.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
};