import React from 'react';
import type { DetectionWithTimestamp } from '../types/detection';

interface DetectionListProps {
  detections: DetectionWithTimestamp[];
}

export const DetectionList: React.FC<DetectionListProps> = ({ detections }) => {
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Detection History</h2>
      {detections.length === 0 ? (
        <p className="text-gray-500">No detections yet</p>
      ) : (
        <ul className="space-y-2">
          {detections.map((detection, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
            >
              <span className="font-medium">
                {detection.class} ({Math.round(detection.score * 100)}%)
              </span>
              <span className="text-sm text-gray-500">
                {new Date(detection.timestamp).toLocaleTimeString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};