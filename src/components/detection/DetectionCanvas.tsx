import React, { useRef, useEffect } from 'react';
import type { Detection } from '../../types/detection';
import { drawDetections } from '../../utils/canvas';

interface DetectionCanvasProps {
  stream: MediaStream | null;
  detections: Detection[];
}

export const DetectionCanvas: React.FC<DetectionCanvasProps> = ({
  stream,
  detections
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video && stream) {
      video.srcObject = stream;
      video.play().catch(console.error);
    }
  }, [stream]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (!canvas || !video || !detections.length) return;
    
    drawDetections(canvas, video, detections);
  }, [detections]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <video
        ref={videoRef}
        className="w-full rounded-lg shadow-lg"
        autoPlay
        playsInline
        muted
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        width={640}
        height={480}
      />
    </div>
  );
};