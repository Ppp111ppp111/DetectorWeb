import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import type { Detection } from '../types/detection';

class DetectionService {
  private model: cocossd.ObjectDetection | null = null;

  async initialize(): Promise<void> {
    await tf.ready();
    await tf.setBackend('webgl');
    this.model = await cocossd.load({
      base: 'lite_mobilenet_v2'
    });
  }

  async detect(video: HTMLVideoElement): Promise<Detection[]> {
    if (!this.model) {
      throw new Error('Model not initialized');
    }

    const predictions = await this.model.detect(video);
    return predictions.map(pred => ({
      bbox: pred.bbox as [number, number, number, number],
      class: pred.class,
      score: pred.score
    }));
  }

  isInitialized(): boolean {
    return this.model !== null;
  }
}

export const detectionService = new DetectionService();