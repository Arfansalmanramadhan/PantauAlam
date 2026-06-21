import { createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Cuaca from "../page/Cuaca"
import GempaHome from "../page/gempa/GempaHome"
import GempaTerkini from "../page/gempa/GempaTerkini"
import GempaTerkiniDetail from "../page/gempa/GempaM5+Detail"
import GempaDirasakan from "../page/gempa/GempaDirasakan"
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
    },
    {
        path: "/gempabumi-M5+",
        element: <GempaTerkini />,
    },
    {
        path: "/gempabumi-M5+/detail/:Coordinates",
        element: <GempaTerkiniDetail />,
    },
    {
        path: "/gempabumi-dirasakan",
        element: <GempaDirasakan />,
    }
])