import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Sidebar, useSidebar } from "../../components/SIdebar"
import Header from "../../components/Header"
import Main from "../../components/Main"
import L from "leaflet"
import Footer from "../../components/Footer"
import "leaflet/dist/leaflet.css"

function GempaTerkiniDetail() {
    const [open, setOpen] = useSidebar();
    const { Coordinates } = useParams();
    const [gempa, setGempa] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8000/api/gempa/gempaterkini/${Coordinates}`)
            .then(response => response.json())
            .then(data => {
                const dataGempa = data.payload || data.data || data
                setGempa(dataGempa)
                console.log('data gempa berhasil dimuat', data)
            })
            .catch(err => {
                console.error('gagal memuat data gempa', err)
            })
    }, [Coordinates])
    // console.log('gempa detail', Coordinates, gempa)
    useEffect(() => {
        if (!gempa || !gempa.Coordinates) return;
        const container = L.DomUtil.get('map');
        if (container != null) {
            container._leaflet_id = null;
        }
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 m-5 ">
                        <div
                            id="map"
                            style={{
                                // height: "400px",
                                width: "100%"
                            }}
                            className="rounded-xl overflow-hidden shadow-md mb-5 flex-1 h-[600px] lg:h-[600px]"
                        />


                        <div className="flex-1 ">
                            <div className=" bg-gray-10 rounded-x1 shadow-md p-6 flex flex-col justify-center  h-full   ">
                                <span className={`${magColor} text-black px-4 py-2 rounded-lg mb-5`}>{gempa?.potensi}</span>
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
export default GempaTerkiniDetail;