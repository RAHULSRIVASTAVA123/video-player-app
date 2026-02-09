import { useNavigate } from "react-router-dom";
import type { Video } from "../types/video";

interface RelatedVideoListProps {
  videos: Video[];
  currentVideoId: string;
  category: string;
}

const RelatedVideoList = ({
  videos,
  currentVideoId,
  category,
}: RelatedVideoListProps) => {
  const navigate = useNavigate();

  const relatedVideos = videos.filter(
    (v) => v.category === category && v.id !== currentVideoId
  );

  if (relatedVideos.length === 0) return null;

  return (
    <div style={{ padding: "12px" }}>
      <h3 style={{ marginBottom: "10px" }}>Related Videos</h3>

      <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
        {relatedVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => navigate(`/player/${video.id}`)}
            style={{
              minWidth: "160px",
              cursor: "pointer",
            }}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{
                width: "100%",
                height: "90px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <p style={{ fontSize: "14px", marginTop: "6px" }}>
              {video.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedVideoList;