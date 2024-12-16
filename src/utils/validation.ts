import type { Detection } from '../types/detection';
import { DETECTION_CONFIG } from './constants';

export const isValidDetection = (detection: Detection): boolean => {
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
    detection.score >= DETECTION_CONFIG.MIN_CONFIDENCE
  );
};