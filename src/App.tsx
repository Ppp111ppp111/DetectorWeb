import React, { useCallback, useEffect, useState } from 'react';
import { Camera } from './components/Camera';
import { DetectionControls } from './components/DetectionControls';
import { DetectionList } from './components/DetectionList';
import { ErrorMessage } from './components/ErrorMessage';
import { useObjectDetection } from './hooks/useObjectDetection';
import { useDetectionState } from './hooks/useDetectionState';
import { useDetectionLoop } from './hooks/useDetectionLoop';
import { addTimestampToDetections } from './utils/detection';
import { Camera as CameraIcon } from 'lucide-react';

function App() {
  const {
    isInitialized,
    isDetecting,
    error,
    initializeModel,
    retryInitialization,
    startCamera,
    stopCamera,
    detectObjects,
    setIsDetecting
  } = useObjectDetection();

  const [stream, setStream] = useState<MediaStream | null>(null);
  const { detections, currentDetections, addDetections, clearDetections } = useDetectionState();

  useEffect(() => {
    initializeModel().catch(() => {}); // Error is handled in the hook
  }, [initializeModel]);

  const handleDetection = useCallback((newDetections) => {
    const detectionsWithTimestamp = addTimestampToDetections(newDetections);
    addDetections(detectionsWithTimestamp);
  }, [addDetections]);

  useDetectionLoop({
    isDetecting,
    onDetection: handleDetection,
    detectObjects
  });

  const handleToggleDetection = useCallback(async () => {
    if (isDetecting) {
      setIsDetecting(false);
      stopCamera();
      setStream(null);
      clearDetections();
    } else {
      const newStream = await startCamera();
      if (newStream) {
        setStream(newStream);
        setIsDetecting(true);
      }
    }
  }, [isDetecting, startCamera, stopCamera, setIsDetecting, clearDetections]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <CameraIcon size={32} className="text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              Real-time Object Detection
            </h1>
          </div>
          <p className="text-gray-600">
            Point your camera at objects to detect them in real-time
          </p>
        </header>

        {error && (
          <div className="mb-4">
            <ErrorMessage 
              message={error} 
              onRetry={retryInitialization}
            />
          </div>
        )}

        <DetectionControls
          isDetecting={isDetecting}
          onToggleDetection={handleToggleDetection}
          isInitialized={isInitialized}
        />

        <Camera
          stream={stream}
          detections={currentDetections}
        />

        <DetectionList detections={detections} />
      </div>
    </div>
  );
}

export default App;