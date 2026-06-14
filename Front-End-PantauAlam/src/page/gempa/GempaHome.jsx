import { useState, useRef, useEffect } from 'react';
import { Sidebar, useSidebar } from "../../components/SIdebar"
import Header from "../../components/Header"
import Main from "../../components/Main"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

function GempaHome() {
    const [open, setOpen] = useSidebar();
    const mapRef = useRef(null);
    const [gempa, setGempa] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8000/api/gempa/')
            .then(response => response.json())
            .then(data => {
                const dataGempa = data.payload || data.data || data
                setGempa(dataGempa)
                console.log('data gempa berhasil dimuat', data)
            })
            .catch(err => {
                console.error('gagal memuat data gempa', err)
            })
    }, [])

    useEffect(() => {
        if (!gempa) return;
        const [lat, lng] = gempa.Coordinates
            .split(",")
            .map(Number)
        const map = L.map("map").setView([lat, lng], 8);
        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
        ).addTo(map);
        L.marker([lat, lng])
            .addTo(map)
            .bindPopup(
                `<b>${gempa.wilayah}</b><br>Magnitude: ${gempa.magnitudo}<br>Kedalaman: ${gempa.Kedalaman}`
            )
            .openPopup();
        mapRef.current = map;
        return () => {
            map.remove();
        };

    }, [gempa]);
    const magnitude = parseFloat(gempa?.magnitudo);

    const magColor =
        magnitude >= 7
            ? "bg-red-100"
            : magnitude >= 5
                ? "bg-orange-100"
                : "bg-green-100";

    return (
        <>
            <div className="flex">
                <Sidebar open={open} setOpen={setOpen} />
                <Main open={open}>
                    <Header label="Gempa Saat ini" />
                    <div
                        id="map"
                        style={{
                            height: "400px",
                            width: "100%"
                        }}
                        className="rounded-xl overflow-hidden shadow-md mb-5"
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 m-5 ">

                        <div className="flex-1">
                            <div className=" bg-gray-100 rounded-2x1  flex flex-col justify-center p-5  items-center    ">
                                {gempa?.peta_shakemap ? (
                                    <img
                                        src={gempa.peta_shakemap}
                                        alt="ShakeMap Gempa"
                                        className="w-full max-h-[full] object-contain rounded-xl shadow-md"
                                    />
                                ) : (
                                    <div className="h-[300px] flex items-center justify-center text-gray-500">
                                        ShakeMap belum tersedia
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className=" bg-gray-10 rounded-x1 shadow-md p-6 flex flex-col justify-center  h-full   ">
                                <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg mb-5">{gempa?.potensi}</span>
                                <span className="text-md font-semibold py-2">Waktu: {new Date(gempa?.DateTime).toLocaleString('id-ID', {
                                    weekday: "long", year: "numeric", month: "long", day: "numeric",
                                })}</span>
                                <h2 className="text-2xl font-bold">{gempa?.wilayah}</h2>
                                <div className="grid lg:grid-cols-1 gap-1 my-4    ">
                                    <div className={`${magColor} p-4 rounded-lg`}>
                                        <p className="text-sm text-gray-500">
                                            Magnitude
                                        </p>

                                        <h3 className="text-xl font-bold">
                                            {gempa?.magnitudo}
                                        </h3>
                                    </div>
                                    <div className="bg-green-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            Kedalaman
                                        </p>

                                        <h3 className="text-xl font-bold">
                                            {gempa?.Kedalaman}
                                        </h3>
                                    </div>
                                    <div className="bg-sky-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            Koordinat
                                        </p>

                                        <h3 className="text-xl font-bold">
                                            {gempa?.Coordinates}
                                        </h3>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            Lintang & Bujur
                                        </p>

                                        <h3 className="text-xl font-bold">
                                            {gempa?.Lintang} - {gempa?.Bujur}
                                        </h3>
                                    </div>
                                    <div className="bg-yellow-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            Dirasakan
                                        </p>

                                        <h3 className="text-xl font-bold">
                                            {gempa?.Dirasakan || "Tidak ada laporan dirasakan"}
                                        </h3>
                                    </div>

                                    <p className="text-sm text-slate-50 bg-slate-500 p-4 rounded-lg">Tanggal: {gempa?.tanggal}</p>
                                    <p className="text-sm text-indigo-50 bg-indigo-500 p-4 rounded-lg">Waktu: {gempa?.jam}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <Footer />
                </Main>
            </div>
        </>
    )
}
export default GempaHome;