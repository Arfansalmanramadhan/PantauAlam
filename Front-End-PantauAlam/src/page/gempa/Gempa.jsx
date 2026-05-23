import React from 'react';

function Gempa() {
    return (
        <>

            <div className="px-10 py-5 ">
                <div className="grid grid-cols-1">
                    <div className=" bg-gray-100 rounded-2x1  flex flex-col justify-center p-5 ">
                        <img src="" alt="gempa" className="w-20 h-20" />
                        <h2 className="text-lg font-bold">Gempa Bumi Saat Ini</h2>
                        <span className="text-sm text-gray-500">Gempa dirasakan</span>
                        <h3 className="text-lg font-bold">Pusat gempa berada di laut 34 km Timur Laut Kab. Jayapura </h3>
                        <h3 className="text-md font-semibold">Magnitude: 5.2</h3>
                        <p className="text-sm text-gray-500">Lokasi: 10 km barat daya Kota X</p>
                        <p className="text-sm text-gray-500">Waktu: 2024-06-01 12:30:00</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Gempa;