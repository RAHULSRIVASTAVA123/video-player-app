// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import { videos } from "../data/videos";
// import VideoCard from "../components/VideoCard";
// import "../styles/player.css";

// const showSkip = (text: string) => {
//   const el = document.getElementById("skip-indicator");
//   if (!el) return;

//   el.innerText = text;
//   el.style.opacity = "1";
//   setTimeout(() => {
//     el.style.opacity = "0";
//   }, 600);
// };

// const PlayerPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const [isMini, setIsMini] = useState(false);

//   const video = videos.find((v) => v.id === id);

//   /* =========================
//      KEYBOARD SHORTCUTS
//   ========================= */
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (!videoRef.current) return;

//       switch (e.key) {
//         case " ":
//           e.preventDefault();
//           videoRef.current.paused
//             ? videoRef.current.play()
//             : videoRef.current.pause();
//           break;

//         case "ArrowRight":
//           videoRef.current.currentTime += 10;
//           showSkip("+10s");
//           break;

//         case "ArrowLeft":
//           videoRef.current.currentTime -= 10;
//           showSkip("-10s");
//           break;

//         case "f":
//         case "F":
//           videoRef.current.requestFullscreen();
//           break;

//         case "m":
//         case "M":
//           videoRef.current.muted = !videoRef.current.muted;
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, []);

//   if (!video) {
//     return (
//       <div className="player-error">
//         <p>Video not found</p>
//         <button onClick={() => navigate("/")}>Go Home</button>
//       </div>
//     );
//   }

//   const relatedVideos = videos.filter(
//     (v) => v.category === video.category && v.id !== video.id
//   );

//   return (
//     <div className="player-page">
//       {/* =========================
//          VIDEO PLAYER
//       ========================= */}
//       <div className={`video-wrapper ${isMini ? "mini" : ""}`}>
//         <video
//           ref={videoRef}
//           src={video.url}
//           controls
//           autoPlay
//           className="video-element"
//         />

//         {/* OVERLAY BUTTONS */}
//         <div className="overlay-controls">
//           <button onClick={() => {
//             videoRef.current!.currentTime -= 10;
//             showSkip("-10s");
//           }}>
//             ⏪ 10s
//           </button>

//           <button onClick={() => {
//             videoRef.current!.currentTime += 10;
//             showSkip("+10s");
//           }}>
//             ⏩ 10s
//           </button>

//           <button onClick={() => setIsMini(!isMini)}>
//             {isMini ? "⬆ Expand" : "⬇ Minimize"}
//           </button>
//         </div>
//       </div>

//       {/* =========================
//          VIDEO META
//       ========================= */}
//       {!isMini && (
//         <>
//           <div className="video-meta">
//             <h2>{video.title}</h2>
//             <p>{video.category}</p>
//           </div>

//           {/* =========================
//              RECOMMENDED VIDEOS
//           ========================= */}
//           <div className="recommended-section">
//             <h3>Recommended Videos</h3>

//             <div className="recommended-grid">
//               {relatedVideos.map((v) => (
//                 <VideoCard
//                   key={v.id}
//                   video={v}
//                   onClick={() => navigate(`/player/${v.id}`)}
//                 />
//               ))}
//             </div>
//           </div>
//         </>
//       )}

//       <div id="skip-indicator" />
//     </div>
//   );
// };

// export default PlayerPage;

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
// import { videos } from "../data/videos";
// import VideoCard from "../components/VideoCard";
// import "../styles/player.css";

// /* Skip overlay */
// const showSkip = (text: string) => {
//   const el = document.getElementById("skip-indicator");
//   if (!el) return;

//   el.innerText = text;
//   el.style.opacity = "1";
//   setTimeout(() => (el.style.opacity = "0"), 600);
// };

// const PlayerPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [isMini, setIsMini] = useState(false);

//   const video = videos.find((v) => v.id === id);
//   if (!video) return null;

//   const relatedVideos = videos.filter(
//     (v) => v.category === video.category && v.id !== video.id
//   );

//   /* =========================
//      KEYBOARD SHORTCUTS
//   ========================= */
//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (!videoRef.current) return;

//       switch (e.key) {
//         case " ":
//           e.preventDefault();
//           videoRef.current.paused
//             ? videoRef.current.play()
//             : videoRef.current.pause();
//           break;

//         case "ArrowRight":
//           videoRef.current.currentTime += 10;
//           showSkip("+10s");
//           break;

//         case "ArrowLeft":
//           videoRef.current.currentTime -= 10;
//           showSkip("-10s");
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, []);

//   /* =========================
//      AUTO-PLAY NEXT VIDEO 🔁
//   ========================= */
//   useEffect(() => {
//     if (!videoRef.current) return;

//     const handleEnded = () => {
//       const currentIndex = videos.findIndex((v) => v.id === id);
//       const nextVideo = videos[currentIndex + 1];

//       if (nextVideo) {
//         navigate(`/player/${nextVideo.id}`);
//       }
//     };

//     videoRef.current.addEventListener("ended", handleEnded);

//     return () => {
//       videoRef.current?.removeEventListener("ended", handleEnded);
//     };
//   }, [id, navigate]);

//   return (
//     <div className={`player-page ${isMini ? "has-mini" : ""}`}>
//       {/* VIDEO */}
//       <div className={`video-wrapper ${isMini ? "mini" : ""}`}>
//         <video
//           ref={videoRef}
//           src={video.url}
//           controls
//           autoPlay
//           muted              /* browser-safe autoplay */
//           preload="auto"
//           playsInline
//           className="video-element"
//         />

//         {/* ON-SCREEN CONTROLS */}
//         <div className="overlay-controls">
//           <button
//             onClick={() => {
//               if (!videoRef.current) return;
//               videoRef.current.currentTime -= 10;
//               showSkip("-10s");
//             }}
//           >
//             ⏪ 10s
//           </button>

//           <button
//             onClick={() => {
//               if (!videoRef.current) return;
//               videoRef.current.currentTime += 10;
//               showSkip("+10s");
//             }}
//           >
//             10s ⏩
//           </button>

//           <button onClick={() => setIsMini(!isMini)}>
//             {isMini ? "⬆ Expand" : "⬇ Minimize"}
//           </button>
//         </div>
//       </div>

//       {/* META */}
//       <div className="video-meta">
//         <h2>{video.title}</h2>
//         <p>{video.category}</p>
//       </div>

//       {/* RECOMMENDED VIDEOS */}
//       <div className="recommended-section">
//         <h3>Recommended Videos</h3>
//         <div className="recommended-grid">
//           {relatedVideos.map((v) => (
//             <VideoCard
//               key={v.id}
//               video={v}
//               onClick={() => navigate(`/player/${v.id}`)}
//             />
//           ))}
//         </div>
//       </div>

//       <div id="skip-indicator" />
//     </div>
//   );
// };

// export default PlayerPage;


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { videos } from "../data/videos";
import VideoCard from "../components/VideoCard";
import "../styles/player.css";

/* Skip indicator helper */
const showSkip = (text: string) => {
  const el = document.getElementById("skip-indicator");
  if (!el) return;

  el.innerText = text;
  el.style.opacity = "1";
  setTimeout(() => (el.style.opacity = "0"), 600);
};

const PlayerPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMini, setIsMini] = useState(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState(true);
  const [countdown, setCountdown] = useState<number | null>(null);

  const video = videos.find((v) => v.id === id);
  if (!video) return null;

  const relatedVideos = videos.filter(
    (v) => v.category === video.category && v.id !== video.id
  );

  /* ⌨️ Keyboard shortcuts */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.key) {
        case " ":
          e.preventDefault();
          videoRef.current.paused
            ? videoRef.current.play()
            : videoRef.current.pause();
          break;
        case "ArrowRight":
          videoRef.current.currentTime += 10;
          showSkip("+10s");
          break;
        case "ArrowLeft":
          videoRef.current.currentTime -= 10;
          showSkip("-10s");
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* ▶️ AUTOPLAY + COUNTDOWN */
 useEffect(() => {
  if (!videoRef.current || !isAutoplayOn) {
    setCountdown(null);
    return;
  }

  let countdownInterval: ReturnType<typeof setInterval> | null = null;
  let navigateTimeout: ReturnType<typeof setTimeout> | null = null;

  const handleEnded = () => {
    // Prevent multiple triggers
    if (countdown !== null) return;

    let count = 5;
    setCountdown(count);

    countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);

      if (count <= 0 && countdownInterval) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    navigateTimeout = setTimeout(() => {
      const currentIndex = videos.findIndex((v) => v.id === id);
      const nextVideo = videos[currentIndex + 1];

      if (nextVideo) {
        navigate(`/player/${nextVideo.id}`);
      }
    }, 5000);
  };

  videoRef.current.addEventListener("ended", handleEnded);

  return () => {
    if (countdownInterval) clearInterval(countdownInterval);
    if (navigateTimeout) clearTimeout(navigateTimeout);
    setCountdown(null);
    videoRef.current?.removeEventListener("ended", handleEnded);
  };
}, [id, navigate, isAutoplayOn]);
  return (
    <div className="player-page">
      {/* 🎬 VIDEO */}
      <div className={`video-wrapper ${isMini ? "mini" : ""}`}>
        <video
          ref={videoRef}
          src={video.url}
          controls
          autoPlay
          preload="auto"
          playsInline
          className="video-element"
        />

        {/* Overlay buttons */}
        <div className="overlay-controls">
          <button
            onClick={() => {
              if (!videoRef.current) return;
              videoRef.current.currentTime -= 10;
              showSkip("-10s");
            }}
          >
            ⏪ 10s
          </button>

          <button
            onClick={() => {
              if (!videoRef.current) return;
              videoRef.current.currentTime += 10;
              showSkip("+10s");
            }}
          >
            10s ⏩
          </button>

          <button onClick={() => setIsMini(!isMini)}>
            {isMini ? "⬆ Expand" : "⬇ Minimize"}
          </button>
        </div>

        {/* Countdown */}
        {countdown !== null && isAutoplayOn && (
          <div className="next-countdown">
            Next video in {countdown}…
          </div>
        )}
      </div>

      {/* Autoplay toggle */}
      <div className="autoplay-toggle">
        <label>
          <input
            type="checkbox"
            checked={isAutoplayOn}
            onChange={() => setIsAutoplayOn(!isAutoplayOn)}
          />
          Autoplay
        </label>
      </div>

      {/* Meta */}
      <div className="video-meta">
        <h2>{video.title}</h2>
        <p>{video.category}</p>
      </div>

      {/* Recommended videos (always visible) */}
      <div className="recommended-section">
        <h3>Recommended Videos</h3>
        <div className="recommended-grid">
          {relatedVideos.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              onClick={() => navigate(`/player/${v.id}`)}
            />
          ))}
        </div>
      </div>

      <div id="skip-indicator" />
    </div>
  );
};

export default PlayerPage;