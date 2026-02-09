export interface Video {
  id: string;
  title: string;
  description?: string;
  url: string;           // video source (mp4 / youtube embed)
  thumbnail: string;
  duration: string;      // ex: "10:45"
  category: string;
}