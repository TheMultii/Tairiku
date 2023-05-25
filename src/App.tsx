import { Route, Routes } from "@solidjs/router";
import { Component, onMount } from "solid-js";
import { Home, Login, LoginCallback, Logout, Test } from "./routes";
import TairikuTokenDataExtended from "./interfaces/TairikuTokenDataExtended";

const App: Component = () => {
  onMount(async () => {
    const access_token = localStorage.getItem("tairiku-auth-client");

    if (access_token) {
      const at: TairikuTokenDataExtended = JSON.parse(access_token);
      const expireDate = new Date(at.expires_at * 1000);
      if (expireDate < new Date()) {
        localStorage.removeItem("tairiku-auth-client");
        window.location.reload();
      }
    }
  });

  return (
    <Routes>
      <Route path="/test" element={<Test />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login-callback" element={<LoginCallback />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default App;
