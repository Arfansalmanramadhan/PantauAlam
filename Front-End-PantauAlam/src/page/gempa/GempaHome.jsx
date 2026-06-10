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

    return (
        <>
            <div className="flex">
                <Sidebar open={open} setOpen={setOpen} />
                <Main open={open}>
                    <Header label="Gempa" />
                    <div
                        id="map"
                        style={{
                            height: "400px",
                            width: "100%"
                        }}
                    />
                    <div className="flex flex-col md:flex-row gap-5 m-5">

                        <div className="flex-1">
                            <div className=" bg-gray-100 rounded-2x1  flex flex-col justify-center p-5  items-center    ">
                                <img src={gempa?.peta_shakemap} alt="gempa" className="w-200  rounded-lg shadow-sm " />
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className=" bg-gray-100 rounded-2x1  md:h-141 flex flex-col justify-center p-5 md:items-start items-center   ">
                                <span className="text-sm text-gray-500">{gempa?.potensi}</span>
                                <h3 className="text-lg font-bold">{gempa?.wilayah}</h3>
                                <h3 className="text-md font-semibold">Magnitude: {gempa?.magnitudo}</h3>
                                <h3 className="text-md font-semibold">Kedalaman: {gempa?.Kedalaman}</h3>
                                <h3 className="text-md font-semibold">Dirasakan: {gempa?.Dirasakan}</h3>
                                <h3 className="text-md font-semibold">Dirasakan: {gempa?.DateTime}</h3>
                                <p className="text-sm text-gray-500">Tanggal: {gempa?.tanggal}</p>
                                <p className="text-sm text-gray-500">Waktu: {gempa?.jam}</p>
                            </div>
                        </div>

                    </div>
                </Main>
            </div>
        </>
    )
}
export default GempaHome;