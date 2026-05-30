import { React, useState, useEffect } from 'react';

function Gempa() {
    const [gempa, setGempa] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:8000/api/gempa/gempaHome')
            .then(response => response.json())
            .then(data => {
                const dataGempa = data.payload || data.data || data
                setGempa(dataGempa)
                setLoading(false)
                console.log('data gempa berhasil dimuat', data)
            })
            .catch(err => {
                console.error('gagal memuat data gempa', err)
                setLoading(false)
            })
    }, [])
    return (
        <>

            <div className="px-10 py-5 ">
                <div className="grid grid-cols-1">
                    <div className=" bg-gray-100 rounded-2x1  flex flex-col justify-center p-5 ">
                        <img src={gempa.peta_shakemap} alt="gempa" className="w-full  rounded-lg shadow-sm " />
                        <h2 className="text-lg font-bold">Gempa Bumi Saat Ini</h2>
                        <span className="text-sm text-gray-500">{gempa.potensi}</span>
                        <h3 className="text-lg font-bold">{gempa.wilayah}</h3>
                        <h3 className="text-md font-semibold">Magnitude: {gempa.magnitudo}</h3>
                        <p className="text-sm text-gray-500">Tanggal: {gempa.tanggal}</p>
                        <p className="text-sm text-gray-500">Waktu: {gempa.jam}</p>
                        <a href={gempa.link} target="_blank" rel="noopener noreferrer" className="inline-block text-center text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 p-2 m-2 rounded-md text-sm font-medium transition-colors">Lihat Detail</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Gempa;