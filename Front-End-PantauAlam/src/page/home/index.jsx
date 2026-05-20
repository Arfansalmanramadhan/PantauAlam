import { useState, useEffect } from "react"
import Sidebar from "../../components/SIdebar"
import Header from "../../components/Header"
import Main from "../../components/Main"
import { CuacaSaatIni, CuacaBesok, CuacaLusa } from "../Cuaca/CuacaSaatIni"
import Tab from "../Tab"

function Home() {
    const [open, setOpen] = useState(window.innerWidth >= 768);
    const [activetab, setActiveTab] = useState(0)
    const [daftarCuaca, setDaftarCuaca] = useState([]);
    const [loading, setLoading] = useState(true);
    const [halaman, setHalaman] = useState(1);
    const [totalHalaman, setTotalHalaman] = useState(1);
    useEffect(() => {
        fetch(`http://localhost:5000/api/cuaca?page=${halaman}&limit=20`)
            .then(response => response.json())
            .then(data => {
                const dataBersi = data.payload || data.data || data
                setDaftarCuaca(dataBersi)
                if (dataBersi && dataBersi.meta && dataBersi.meta.total_halaman) {
                    setTotalHalaman(dataBersi.meta.total_halaman)

                } else {
                    setTotalHalaman(1)
                }
                setLoading(false)
                // console.log('data cuaca berhasil dimuat', data)
            })
            .catch(err => {
                console.error('gagal memuat data cuaca', err)
            })
            .finally(() =>
                setLoading(false)

            )
    }, [halaman])
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

                    <div className="flex gap-4 mb-4 relative sm:z-50 left-15">
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

                        {activetab === 0 && <CuacaSaatIni
                            data={daftarCuaca}
                            halaman={halaman}
                            setHalaman={setHalaman}
                            totalHalaman={totalHalaman}
                        />}

                        {activetab === 1 && <CuacaBesok
                            data={daftarCuaca}
                            halaman={halaman}
                            setHalaman={setHalaman}
                            totalHalaman={totalHalaman}
                        />}

                        {activetab === 2 && <CuacaLusa
                            data={daftarCuaca}
                            halaman={halaman}
                            setHalaman={setHalaman}
                            totalHalaman={totalHalaman}
                        />}

                    </div>
                </Main>
            </div>
        </>
    )
}
export default Home