import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Cuaca from "../page/Cuaca"
import GempaHome from "../page/gempa/GempaHome"
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/cuaca",
        element: <Cuaca />,
    },
    {
        path: "/gempa",
        element: <GempaHome />,
    }
])