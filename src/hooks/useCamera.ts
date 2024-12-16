import { useCallback, useRef, useState } from 'react';
import { CameraError } from '../utils/errors';

export const useCamera = () => {
  const [error, setError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      // First check if permissions are granted
      const permissions = await navigator.permissions.query({ name: 'camera' as PermissionName });
      
      if (permissions.state === 'denied') {
        throw new CameraError('Camera permission denied. Please enable camera access in your browser settings.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      });
      
      streamRef.current = stream;
      setError(null);
      return stream;
    } catch (err) {
      const errorMessage = err instanceof CameraError 
        ? err.message 
        : 'Failed to access camera. Please ensure you have a camera connected and grant permission when prompted.';
      
      setError(errorMessage);
      return null;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setError(null);
  }, []);

  return {
    error,
    startCamera,
    stopCamera
  };
};