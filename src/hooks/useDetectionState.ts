import { useState } from 'react';
import type { DetectionWithTimestamp } from '../types/detection';

export const useDetectionState = () => {
  const [detections, setDetections] = useState<DetectionWithTimestamp[]>([]);
  const [currentDetections, setCurrentDetections] = useState<DetectionWithTimestamp[]>([]);

  const addDetections = (newDetections: DetectionWithTimestamp[]) => {
    setCurrentDetections(newDetections);
    setDetections(prev => [...newDetections, ...prev].slice(0, 10));
  };

  const clearDetections = () => {
    setDetections([]);
    setCurrentDetections([]);
  };

  return {
    detections,
    currentDetections,
    addDetections,
    clearDetections
  };
};