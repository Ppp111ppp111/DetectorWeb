export const DETECTION_CONFIG = {
  MAX_HISTORY_ITEMS: 10,
  MIN_CONFIDENCE: 0.6,
  MAX_ERROR_COUNT: 3,
  MODEL_CONFIG: {
    base: 'lite_mobilenet_v2'
  }
} as const;

export const ERROR_MESSAGES = {
  CAMERA_PERMISSION: 'Camera permission denied. Please enable camera access in your browser settings.',
  MODEL_LOAD: 'Failed to load the detection model. Please check your internet connection.',
  DETECTION: 'Failed to process video frame. Please try again.',
  INITIALIZATION: 'Failed to initialize. Please refresh the page.'
} as const;