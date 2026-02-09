// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { videos } from "../data/videos";
// import VideoCard from "../components/VideoCard";
// import "../styles/home.css";

// const TABS = ["All", "Animation", "Education", "Travel", "Music"];

// const Home = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState<string>("All");

//   // Filter videos based on active tab
//   const filteredVideos: Video[] =
//     activeTab === "All"
//       ? videos
//       : videos.filter((video) => video.category === activeTab);

//   return (
//     <div className="home">
//       <h1 className="app-title">Video Player App</h1>

//       {/* Tabs */}
//       <div className="tabs">
//         {TABS.map((tab) => (
//           <button
//             key={tab}
//             className={`tab ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Video Grid */}
//       <div className="video-row">
//         {filteredVideos.map((video) => (
//           <VideoCard
//             key={video.id}
//             video={video}
//             onClick={() => navigate(`/player/${video.id}`)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


// import { useNavigate } from "react-router-dom";
// import { useState, useMemo } from "react";
// import { videos } from "../data/videos";
// import type { Video } from "../types/video";
// import VideoCard from "../components/VideoCard";
// import SkeletonCard from "../components/SkeletonCard";
// import "../styles/home.css";

// const TABS = ["All", "Animation", "Education", "Travel", "Music"];

// const Home = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("All");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const filteredVideos: Video[] = useMemo(() => {
//     let result =
//       activeTab === "All"
//         ? videos
//         : videos.filter((v) => v.category === activeTab);

//     if (search.trim()) {
//       result = result.filter((v) =>
//         v.title.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     return result;
//   }, [activeTab, search]);

//   return (
//     <div className="home">
//       <h1 className="app-title">Video Player App</h1>

//       {/* Search */}
//       <input
//         className="search-input"
//         placeholder="Search videos..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Tabs */}
//       <div className="tabs">
//         {TABS.map((tab) => (
//           <button
//             key={tab}
//             className={`tab ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Videos */}
//       <div className="video-row">
//         {loading
//           ? Array.from({ length: 12 }).map((_, i) => (
//               <SkeletonCard key={i} />
//             ))
//           : filteredVideos.map((video) => (
//               <VideoCard
//                 key={video.id}
//                 video={video}
//                 onClick={() => navigate(`/player/${video.id}`)}
//               />
//             ))}
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useNavigate } from "react-router-dom";
import { videos } from "../data/videos";
import type { Video } from "../types/video";
// import VideoCard from "../components/VideoCard";
import type { VideoCardProps } from "../components/VideoCard";
import "../styles/home.css";
import { useState, useMemo } from "react";

const TABS = ["All", "Animation", "Education", "Travel", "Music"];

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      const matchesTab =
        activeTab === "All" || v.category === activeTab;
      const matchesSearch = v.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  return (
    <div className="home">
      {/* HEADER */}
      <div className="home-header">
        <h1 className="app-title">Video Player App
             ▶️ 
        </h1>

        {/* SEARCH BAR */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* VIDEOS GRID */}
      <div className="video-grid">
        {filteredVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            onClick={() => navigate(`/player/${video.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
