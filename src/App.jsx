import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./Firebase/config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authpage from "./pages/Authpage";
import FeedPage from "./pages/FeedPage";
import ProtectedRoute from "./pages/ProtectedRoute";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Authpage />} />
          {/* Korumalı Route */}
          <Route element={<ProtectedRoute />}>
            <Route path='/feed' element={<FeedPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
