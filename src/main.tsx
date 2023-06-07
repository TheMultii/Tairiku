import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./routes/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginCallback from "./routes/LoginCallback.tsx";
import Test from "./routes/Test.tsx";
import Logout from "./routes/Logout.tsx";
import Login from "./routes/Login.tsx";
import TairikuTokenDataExtended from "./interfaces/TairikuTokenDataExtended.ts";

const router = createBrowserRouter([
    {
        path: "/test",
        element: <Test />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/login-callback",
        element: <LoginCallback />,
    },
    {
        path: "/logout",
        element: <Logout />,
    },
    {
        path: "/",
        element: <Home />,
    },
]);

const access_token = localStorage.getItem("tairiku-auth-client");

if (access_token) {
    const at: TairikuTokenDataExtended = JSON.parse(access_token);
    const expireDate = new Date(at.expires_at * 1000);
    if (expireDate < new Date()) {
        localStorage.removeItem("tairiku-auth-client");
        window.location.reload();
    }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <RouterProvider router={router} />
);
