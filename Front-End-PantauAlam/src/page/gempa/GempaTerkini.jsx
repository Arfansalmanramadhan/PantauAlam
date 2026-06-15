import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Main from "../../components/Main";
import { Sidebar, useSidebar } from "../../components/SIdebar";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function GempaTerkini() {
    const [open, setOpen] = useSidebar();
    const [gempaTerkini, setGempaTerkini] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8000/api/gempa/gempaterkini/')
            .then(response => response.json())
            .then(data => {
                const dataGempaTerkini = data.payload || data.data || data
                setGempaTerkini(dataGempaTerkini)
                console.log('data gempa berhasil dimuat', data)
            })
            .catch(err => {
                console.error('gagal memuat data gempa', err)
            })
    }, [])
    useEffect(() => {
        if (!gempaTerkini?.length) return;



        const map = L.map("map").setView([-2.5, 118], 8);

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution:
                    '&copy; OpenStreetMap contributors',
            }
        ).addTo(map);
        const bounds = [];
        gempaTerkini.forEach((gempa) => {

            const [lat, lng] = gempa.Coordinates
                .split(",")
                .map(Number);
            bounds.push([lat, lng]);
            L.marker([lat, lng])
                .addTo(map)
                .bindPopup(`
            <b>${gempa.wilayah}</b>
            <br>Magnitude: ${gempa.magnitudo}
            <br>Kedalaman: ${gempa.Kedalaman}
            `)
                .openPopup();

        });
        if (bounds.length > 0) {
            map.fitBounds(bounds);
        }
        return () => map.remove();

    }, [gempaTerkini]);
    return (
        <>
            <div className="flex">
                <Sidebar open={open} setOpen={setOpen} />
                <Main open={open}>
                    <Header label="Gempa bumi  M 5.0+" />
                    <div
                        id="map"
                        style={{
                            height: "400px",
                            width: "100%"
                        }}
                        className="rounded-xl overflow-hidden shadow-md mb-5"
                    />

                    <Footer />
                </Main>
            </div>
        </>
    )
}
export default GempaTerkini;