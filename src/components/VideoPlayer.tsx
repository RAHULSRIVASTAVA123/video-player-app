import { useEffect, useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  title: string;
}

const VideoPlayer = ({ src, title }: VideoPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMini, setIsMini] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => {
      setDuration(video.duration);
      video.play();
      setIsPlaying(true);
    };

    const onTime = () => setCurrentTime(video.currentTime);

    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("timeupdate", onTime);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
    };
  }, [src]);

  const togglePlay = () => {
    const video = videoRef.current!;
    video.paused ? video.play() : video.pause();
    setIsPlaying(!video.paused);
  };

  const seek = (t: number) => {
    const video = videoRef.current!;
    video.currentTime = Math.max(0, Math.min(t, duration));
  };

  const toggleFullscreen = () => {
    const el = containerRef.current!;
    document.fullscreenElement
      ? document.exitFullscreen()
      : el.requestFullscreen();
  };

  const minimizePlayer = () => setIsMini(true);
  const expandPlayer = () => setIsMini(false);

  const format = (t: number) =>
    `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  return (
    <div
      ref={containerRef}
      style={{
        position: isMini ? "fixed" : "relative",
        bottom: isMini ? "20px" : undefined,
        right: isMini ? "20px" : undefined,
        width: isMini ? "320px" : "100%",
        zIndex: 1000,
        background: "#000",
        color: "#fff",
        borderRadius: isMini ? "8px" : "0",
        overflow: "hidden",
        boxShadow: isMini ? "0 0 12px rgba(0,0,0,0.7)" : "none",
      }}
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={src}
        style={{
          width: "100%",
          maxHeight: isMini ? "180px" : "70vh",
          background: "#000",
        }}
      />

      {/* CONTROLS */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.75)",
          padding: "10px",
        }}
      >
        {/* Seek Bar */}
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={(e) => seek(+e.target.value)}
          style={{ width: "100%" }}
        />

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "6px",
          }}
        >
          <button onClick={() => seek(currentTime - 10)}>⏪ 10s</button>

          <button onClick={togglePlay}>
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>

          <button onClick={() => seek(currentTime + 10)}>⏩ 10s</button>

          {!isMini && (
            <button onClick={minimizePlayer}>⤵ Minimize</button>
          )}

          <button onClick={toggleFullscreen}>⛶</button>

          <span style={{ marginLeft: "auto", fontSize: "14px" }}>
            {format(currentTime)} / {format(duration)}
          </span>
        </div>
      </div>

      {/* Title / Expand */}
      <div style={{ padding: "10px" }}>
        <strong>{title}</strong>

        {isMini && (
          <button
            style={{ marginLeft: "12px" }}
            onClick={expandPlayer}
          >
            ⬆ Expand
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;