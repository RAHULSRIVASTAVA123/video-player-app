import type { Video } from "../types/video";
import "../styles/videoCard.css";
import { useState } from "react";

interface Props {
  video: Video;
  onClick: () => void;
}

const FALLBACK_THUMB =
  "https://dummyimage.com/400x225/1f1f1f/ffffff&text=Video";

const VideoCard = ({ video, onClick }: Props) => {
  const [imgSrc, setImgSrc] = useState(video.thumbnail);

  return (
    <div className="video-card" onClick={onClick}>
      <div className="thumbnail-wrapper">
        <img
          src={imgSrc}
          alt={video.title}
          onError={() => setImgSrc(FALLBACK_THUMB)}
        />
        <span className="duration">{video.duration}</span>
      </div>

      <div className="video-info">
        <p className="video-title">{video.title}</p>
        <span className="video-category">{video.category}</span>
      </div>
    </div>
  );
};

export default VideoCard;
