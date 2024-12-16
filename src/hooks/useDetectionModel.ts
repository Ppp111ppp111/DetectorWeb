import { useCallback, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import type { Detection } from '../types/detection';
import { ModelError } from '../utils/errors';
import { validateDetection } from '../utils/detection';

export const useDetectionModel = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modelRef = useRef<cocossd.ObjectDetection | null>(null);

  const initializeModel = useCallback(async () => {
    try {
      await tf.ready();
      // Explicitly enable WebGL backend for better performance
      await tf.setBackend('webgl');
      
      modelRef.current = await cocossd.load({
        base: 'lite_mobilenet_v2'
      });
      
      setIsInitialized(true);
      setError(null);
    } catch (err) {
      const errorMessage = 'Failed to load the detection model. Please check your internet connection and reload the page.';
      setError(errorMessage);
      throw new ModelError(errorMessage);
    }
  }, []);

  const detectObjects = useCallback(async (video: HTMLVideoElement): Promise<Detection[]> => {
    if (!modelRef.current || !video.videoWidth || !video.videoHeight) {
      return [];
    }
    
    try {
      const predictions = await modelRef.current.detect(video);
      
      // Filter out invalid detections and ensure proper typing
      return predictions
        .filter(pred => validateDetection(pred))
        .map(pred => ({
          bbox: pred.bbox as [number, number, number, number],
          class: pred.class,
          score: pred.score
        }));
    } catch (err) {
      console.error('Detection error:', err);
      setError('Failed to process video frame. Please try again.');
      throw new ModelError('Detection failed');
    }
  }, []);

  return {
    isInitialized,
    error,
    initializeModel,
    detectObjects
  };
};