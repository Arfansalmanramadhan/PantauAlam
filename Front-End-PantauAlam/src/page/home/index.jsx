import { useState, useEffect } from "react"
import Sidebar from "../../components/SIdebar"
import Main from "../../components/Main"
function Home() {
    const [open, setOpen] = useState(window.innerWidth >= 768);
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
        <>
            <div className="flex">
                <Sidebar open={open} setOpen={setOpen} />
                <Main open={open}>
                    <div className=" flex justify-center items-center h-screen bg-gray-100 ">
                        <h1 className="text-3xl font-bold text-blue-600 underline">
                            Halo, Tailwind sudah aktif!
                        </h1>
                    </div>
                </Main>
            </div>
        </>
    )
}
export default Home