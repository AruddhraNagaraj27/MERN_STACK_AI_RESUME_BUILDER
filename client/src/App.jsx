import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./pages/layout.jsx";        // FIX: filename case
import Login from "./pages/login.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ResumeBuilder from "./pages/Resume_builder.jsx"; // FIX: correct file name
import Preview from "./pages/Preview.jsx";

import { useDispatch, useSelector } from "react-redux";
import api from "./configs/api.js";
import { login, setLoading } from "./app/features/authSlice.js";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state) => state.auth);

  const getUserData = async () => {
    const token = localStorage.getItem("token");

    try {
      if (token) {
        const { data } = await api.get("/api/users/data");

        if (data.user) {
          dispatch(login({ token, user: data.user }));
        }
      }

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) return null;

  return (
    <>
      <Toaster />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />

        {/* LOGIN PAGE */}
        <Route path="/auth" element={<Login />} />

        {/* REDIRECT /app?state=login → /auth?state=login */}
        <Route
          path="/app"
          element={!token ? <Navigate to="/auth?state=login" /> : <Layout />}
        >
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
          <Route path="view/:resumeId" element={<Preview />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
