export interface Detection {
  bbox: [number, number, number, number];
  class: string;
  score: number;
}

export interface DetectionWithTimestamp extends Detection {
  timestamp: string;
}