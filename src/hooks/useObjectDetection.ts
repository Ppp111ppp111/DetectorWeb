import { useCallback, useState } from 'react';
import { useCamera } from './useCamera';
import { useDetectionModel } from './useDetectionModel';
import type { Detection } from '../types/detection';

export const useObjectDetection = () => {
  const [isDetecting, setIsDetecting] = useState(false);
  const { error: cameraError, startCamera, stopCamera } = useCamera();
  const { 
    isInitialized, 
    error: modelError, 
    initializeModel, 
    detectObjects 
  } = useDetectionModel();

  const error = cameraError || modelError;

  const retryInitialization = useCallback(async () => {
    setIsDetecting(false);
    stopCamera();
    await initializeModel();
  }, [stopCamera, initializeModel]);

  return {
    isInitialized,
    isDetecting,
    error,
    initializeModel,
    retryInitialization,
    startCamera,
    stopCamera,
    detectObjects,
    setIsDetecting
  };
};