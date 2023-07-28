import ReactDOM from "react-dom/client";
import "./index.css";
import { Home, Login, LoginCallback, Test, Logout } from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TairikuTokenDataExtended } from "./types";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {import.meta.env.DEV && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </QueryClientProvider>
    </StrictMode>
);
