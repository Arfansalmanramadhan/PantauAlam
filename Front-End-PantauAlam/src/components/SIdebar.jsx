import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
export function useSidebar() {
    const [open, setOpen] = useState(window.innerWidth >= 768);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setOpen(true);
            } else {
                setOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return [open, setOpen]
}
export function Sidebar({ open, setOpen }) {
    const location = useLocation();

    const [openGempa, setOpenGempa] = useState(false);

    useEffect(() => {
        if (location.pathname.startsWith("/gempa")) {
            setOpenGempa(true);
        }
    }, [location.pathname]);
    return (

        <div className="flex">
            {/* BUTTON */}
            <button
                onClick={() => setOpen(true)}
                className="fixed top-4 left-4 z-50 bg-blue-400 text-white p-3 rounded-lg "
            >
                ☰
            </button>

            {/* OVERLAY */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0  transition-opacity duration-300 z-40  ${open ? "opacity-100 visible " : "opacity-0 invisible bg-blue-400 text-white"
                    }`}
            ></div>

            {/* SIDEBAR */}
            <div
                className={`fixed top-0 left-0 h-full w-64  bg-blue-400 text-white shadow-xl z-50 transform transition-transform duration-300 ${open ? "translate-x-0 " : "-translate-x-full "
                    }`}
            >
                {/* HEADER */}
                <div className="flex justify-between items-center p-5 border-b  ">
                    <h2 className="text-xl font-bold">Menu</h2>

                    <button onClick={() => setOpen(false)}>
                        ✕
                    </button>
                </div>

                {/* MENU */}
                <ul className="p-4 space-y-2">

                    {/* HOME */}
                    <li>
                        <Link
                            to="/"
                            className={`block p-3 rounded-lg transition ${location.pathname === "/"
                                ? "bg-blue-600"
                                : "hover:bg-blue-500"
                                }`}
                        >
                            🏠 Home
                        </Link>
                    </li>

                    {/* CUACA */}
                    <li>
                        <Link
                            to="/cuaca"
                            className={`block p-3 rounded-lg transition ${location.pathname === "/cuaca"
                                ? "bg-blue-600"
                                : "hover:bg-blue-500"
                                }`}
                        >
                            🌤️ Cuaca
                        </Link>
                    </li>

                    {/* GEMPA */}
                    <li>
                        <button
                            onClick={() => setOpenGempa(!openGempa)}
                            className="w-full text-left p-3 rounded-lg hover:bg-blue-500 transition flex justify-between"
                        >
                            <span>🌍 Gempa</span>
                            <span>
                                {openGempa ? "▲" : "▼"}
                            </span>
                        </button>

                        {openGempa && (
                            <ul className="ml-4 mt-2 space-y-2">

                                <li>
                                    <Link
                                        to="/gempa"
                                        className={`block p-2 rounded ${location.pathname === "/gempa"
                                            ? "bg-blue-600"
                                            : "hover:bg-blue-500"
                                            }`}
                                    >
                                        Gempa Bumi Saat ini
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/gempabumi-M5+"
                                        className={`block p-2 rounded ${location.pathname === "/gempabumi-M5+"
                                            ? "bg-blue-600"
                                            : "hover:bg-blue-500"
                                            }`}
                                    >
                                        Gempa M 5.0+
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/gempabumi-dirasakan"
                                        className={`block p-2 rounded ${location.pathname === "/gempabumi-dirasakan"
                                            ? "bg-blue-600"
                                            : "hover:bg-blue-500"
                                            }`}
                                    >
                                        Gempa Dirasakan
                                    </Link>
                                </li>

                            </ul>
                        )}
                    </li>

                </ul>
            </div>
        </div>
    )

}
export default Sidebar