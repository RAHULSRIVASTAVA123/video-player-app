// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.tsx";
// import PlayerPage from "./pages/PlayerPage.tsx";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/player/:id" element={<PlayerPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlayerPage from "./pages/PlayerPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player/:id" element={<PlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;