import { useState, useEffect } from "react"
function Sidebar({open, setOpen}) {
    
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    // Detect resize layar
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
    return (

        <div className="flex">
            {/* BUTTON */}
            <button
                onClick={() => setOpen(true)}
                className="fixed top-4 left-4 z-50 bg-blue-400 text-white p-3 rounded-lg "
            >
                Menu
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
                <ul className="p-4 space-y-3">
                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
                        >
                            Home
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
                        >
                            Cuaca
                        </a>
                    </li>

                    <li>
                        <a
                            href="#"
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition"
                        >
                            Gempa
                        </a>
                    </li>


                </ul>
                <div className="mt-4 text-center">
                    <p className="text-3xl font-bold tracking-wider">{time.toLocaleTimeString("id-ID")}</p>
                    <p className="text-sm mt-1">{time.toLocaleDateString("id-ID")}</p>
                </div>
            </div>
        </div>
    )

}
export default Sidebar