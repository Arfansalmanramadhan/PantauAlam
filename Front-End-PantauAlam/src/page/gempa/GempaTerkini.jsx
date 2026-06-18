import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Main from "../../components/Main";
import { Sidebar, useSidebar } from "../../components/SIdebar";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// const formatToISO = (dateStr) => {
//     try {
//         const months = {
//             jan: '01', feb: '02', mar: '03', apr: '04', mei: '05', jun: '06',
//             jul: '07', agu: '08', sep: '09', okt: '10', nov: '11', des: '12'
//         };
//         const [day, monthName, year] = dateStr.split(" ");
//         const month = months[monthName.toLowerCase().substring(0, 3)];
//         return `${year}-${month}-${day.padStart(2, '0')}`;
//     } catch (e) {
//         return dateStr;
//     }
// };
function GempaTerkini() {
    const [open, setOpen] = useSidebar();
    const [gempaTerkini, setGempaTerkini] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8000/api/gempa/gempaterkini/')
            .then(response => response.json())
            .then(data => {
                const dataGempaTerkini = data.payload || data.data || data
                setGempaTerkini(Array.isArray(dataGempaTerkini) ? dataGempaTerkini : []);
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
                    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                        <table className="min-w-full">
                            <thead className="bg-blue-300">
                                <tr>
                                    <th className="px-4 py-3 text-center">No</th>
                                    <th className="px-4 py-3 text-center">Waktu</th>
                                    <th className="px-4 py-3 text-center">Magnitude</th>
                                    <th className="px-4 py-3 text-center">Kedalaman</th>
                                    <th className="px-4 py-3 text-center">Koordinat</th>
                                    <th className="px-4 py-3 text-center">Wilayah</th>
                                    <th className="px-4 py-3 text-center">Detail</th>
                                </tr>
                            </thead>

                            <tbody>
                                {gempaTerkini?.map((gempa, index) => (
                                    <tr
                                        key={index}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-3">
                                            {index + 1}
                                        </td>

                                        <td className="px-4 py-3">
                                            {gempa.tanggal}, {gempa.jam}
                                        </td>



                                        <td className="px-4 py-3 text-center">
                                            <span
                                                className={`px-2 py-1 rounded-md font-semibold ${parseFloat(gempa.magnitudo) >= 7
                                                    ? "bg-red-100 text-red-700"
                                                    : parseFloat(gempa.magnitudo) >= 5
                                                        ? "bg-orange-100 text-orange-700"
                                                        : "bg-green-100 text-green-700"
                                                    }`}
                                            >
                                                {gempa.magnitudo}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {gempa.Kedalaman}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {gempa.Lintang}-{gempa.Bujur}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {gempa.wilayah}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link to={`/gempabumi-M5+/detail/${gempa.Coordinates}`} className="text-blue-600 hover:underline">
                                                Selengkapnya
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Footer />
                </Main >
            </div >
        </>
    )
}
export default GempaTerkini;