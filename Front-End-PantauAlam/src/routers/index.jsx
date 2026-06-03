import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Cuaca from "../page/Cuaca"
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/cuaca",
        element: <Cuaca />,
    }
])