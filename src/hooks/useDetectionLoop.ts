import { useCallback, useEffect, useRef } from 'react';
import type { Detection } from '../types/detection';

interface UseDetectionLoopProps {
  isDetecting: boolean;
  onDetection: (detections: Detection[]) => void;
  detectObjects: (video: HTMLVideoElement) => Promise<Detection[]>;
}

export const useDetectionLoop = ({
  isDetecting,
  onDetection,
  detectObjects
}: UseDetectionLoopProps) => {
  const frameRef = useRef<number>();
  const errorCountRef = useRef(0);
  const MAX_ERRORS = 3;

  const stopDetectionLoop = useCallback(() => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = undefined;
    }
  }, []);

  const detectFrame = useCallback(async (videoElement: HTMLVideoElement) => {
    try {
      const detections = await detectObjects(videoElement);
      errorCountRef.current = 0; // Reset error count on successful detection
      onDetection(detections);
    } catch (error) {
      errorCountRef.current++;
      console.error('Detection error:', error);
      
      // Stop detection loop if too many errors occur
      if (errorCountRef.current >= MAX_ERRORS) {
        console.error('Too many detection errors, stopping detection loop');
        stopDetectionLoop();
        return;
      }
    }

    if (isDetecting) {
      frameRef.current = requestAnimationFrame(() => detectFrame(videoElement));
    }
  }, [isDetecting, onDetection, detectObjects, stopDetectionLoop]);

  useEffect(() => {
    const videoElement = document.querySelector('video');
    
    if (isDetecting && videoElement) {
      errorCountRef.current = 0; // Reset error count when starting detection
      detectFrame(videoElement);
    } else {
      stopDetectionLoop();
    }

    return stopDetectionLoop;
  }, [isDetecting, detectFrame, stopDetectionLoop]);

  return { stopDetectionLoop };
};