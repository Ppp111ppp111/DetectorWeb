import type { Detection } from '../types/detection';

export const drawDetections = (
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  detections: Detection[]
): void => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear previous drawings
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bounding boxes and labels
  detections.forEach(detection => {
    const [x, y, width, height] = detection.bbox;
    
    // Draw box
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Draw label background
    const label = `${detection.class} (${Math.round(detection.score * 100)}%)`;
    ctx.font = '16px Arial';
    const textMetrics = ctx.measureText(label);
    const textHeight = 20;
    ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
    ctx.fillRect(
      x,
      y > textHeight ? y - textHeight : y,
      textMetrics.width + 10,
      textHeight
    );

    // Draw label text
    ctx.fillStyle = '#000000';
    ctx.fillText(
      label,
      x + 5,
      y > textHeight ? y - 5 : y + 15
    );
  });
};