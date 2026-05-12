import { useState, useEffect } from "react"
import Sidebar from "../../components/SIdebar"
import Header from "../../components/Header"
import Main from "../../components/Main"
import { CuacaSaatIni, CuacaBesok, CuacaLusa } from "../Cuaca/CuacaSaatIni"
import Tab from "../Tab"

function Home() {
    const [open, setOpen] = useState(window.innerWidth >= 768);
    const [activetab, setActiveTab] = useState(0)
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
                <Header />
                    
                    <div className="flex gap-4 mb-4 relative z-50 left-15">
                        <Tab
                            label="Cuaca Hari Ini"
                            num={0}
                            activee={activetab === 0}
                            onClick={setActiveTab}
                        />

                        <Tab
                            label="Cuaca Besok" 
                            num={1}
                            activee={activetab === 1}
                            onClick={setActiveTab}
                        />

                        <Tab
                            label="Cuaca Lusa"
                            num={2}
                            activee={activetab === 2}
                            onClick={setActiveTab}
                        />
                    </div>
                    <div>

                        {activetab === 0 && <CuacaSaatIni />}

                        {activetab === 1 && <CuacaBesok />}

                        {activetab === 2 && <CuacaLusa />}

                    </div>
                </Main>
            </div>
        </>
    )
}
export default Home