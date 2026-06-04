import { useState, useEffect } from "react"
import { Sidebar, useSidebar } from "../components/Sidebar"
import Header from "../components/Header"
import Main from "../components/Main"
import HomeCuaca from "./Cuaca/Home"
import { CuacaSaatIni, CuacaBesok, CuacaLusa } from "./Cuaca/CuacaSaatIni"
import Gempa from "./gempa/Gempa"
import Tab from "../components/Tab"

function Home() {
    const [open, setOpen] = useSidebar();
    const [activetab, setActiveTab] = useState(0)
    const [daftarCuaca, setDaftarCuaca] = useState([]);
    const [loading, setLoading] = useState(true);
    const [halaman, setHalaman] = useState(1);
    const [totalHalaman, setTotalHalaman] = useState(1);
    useEffect(() => {
        fetch(`http://localhost:8000/api/cuaca/?page=${halaman}&limit=20`)
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
    return (
        <>
            <div className="flex">
                <Sidebar open={open} setOpen={setOpen} />
                <Main open={open}>
                    <Header label="Pantau Alam" />

            
                    <HomeCuaca />


                    <div className="flex justify-center items-center">
                        <Gempa />
                    </div>
                </Main>
            </div>
        </>
    )
}
export default Home