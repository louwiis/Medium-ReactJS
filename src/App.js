import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import Articles from "./pages/articles/index";
import Article from "./pages/articles/_id";
import MapPage from "./pages/map";
import Map from "./components/Map";

import { LocationProvider } from "./providers/LocationStore"
import { AuthProvider, useAuth } from "./providers/AuthStore"
import { ArticleProvider } from "./providers/ArticleStore";

function App() {

  return (
    <AuthProvider>
      <LocationProvider>
        <ArticleProvider>
          <BrowserRouter className="h-screen">
            <Navbar />

            <Routes>
              <Route path="/map" element={<MapPage />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<Article />} />
            </Routes>

            <DisplayMap />
          </BrowserRouter>
        </ArticleProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

function DisplayMap() {
  const location = useLocation();
  const { user } = useContext(useAuth);

  return (
    location.pathname !== "/map" && user &&
    <div className="h-[200px] w-[400px] absolute right-0 bottom-0">
      <Map />
    </div>
  )
}

export default App;
