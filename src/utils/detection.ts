import type { Detection } from '../types/detection';

export const addTimestampToDetections = (detections: Detection[]) => {
  return detections.map(detection => ({
    ...detection,
    timestamp: new Date().toISOString()
  }));
};

export const validateDetection = (detection: Detection): boolean => {
  const [x, y, width, height] = detection.bbox;
  return (
    typeof x === 'number' &&
    typeof y === 'number' &&
    typeof width === 'number' &&
    typeof height === 'number' &&
    width > 0 &&
    height > 0 &&
    typeof detection.class === 'string' &&
    typeof detection.score === 'number' &&
    detection.score >= 0 &&
    detection.score <= 1
  );
};