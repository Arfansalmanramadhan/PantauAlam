import React, { useState, useEffect } from 'react';

export function CuacaSaatIni({ data }) {
    return (
        <>
            <div className="px-14">
                <h2 className='text-2x1 font-bold text-gray-800 mb-6 border-b pb-2'>Cuaca saat ini</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {data.map((wilayah) => {
                        // if (wilayah.status || wilayah.error) return null
                        if (wilayah.status || wilayah.error) {
                            return (
                                <div key={wilayah.id} className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                                    <div>
                                        <h3 className="font-bold text-red-800 text-lg">{wilayah.label || "Tanpa Nama"}</h3>
                                        <p className="text-xs text-gray-500">ID: {wilayah.id}</p>
                                        <p className="text-sm text-red-600 mt-2">❌ {wilayah.status || wilayah.error}</p>
                                    </div>
                                </div>
                            )
                        }
                        const skrg = wilayah.cuaca_sekarang
                        return (
                            <div key={wilayah.id} className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-100 flex flex-col justify-between">
                                {/* Bagian Atas: Gambar/Icon Cuaca */}
                                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-6 flex flex-col items-center text-white">
                                    <img className="w-20 h-20 object-contain drop-shadow-md" src={skrg.icon} alt={skrg.kondisi} />
                                    <h4 className="text-3xl font-black mt-2">{skrg.suhu}</h4>
                                    <p className="text-sm font-medium opacity-90">{skrg.kondisi}</p>
                                </div>
                                {/* Bagian Konten */}
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 truncate">{wilayah.lokasi.desa}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{wilayah.lokasi.kecamatan}, {wilayah.lokasi.kabkota}</p>
                                        <p className="text-xs text-gray-400">🕒 {skrg.waktu_lokal} WIB</p>
                                    </div>
                                    <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition">
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <h2 className="px-14 text-xl font-medium text-black">Cuaca Saat Ini</h2>
            <div className=" flex justify-center items-center  ">
                <div className=" flex justify-center items-center h-screen bg-gray-100 ">
                <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-5  ">
                <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                    <img class="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card Image"></img>
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">jawa barat</h3>
                        <p className="text-gray-600 mb-4">jam</p>
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Lihat Detail
                        </button>
                    </div>

                </div>
            </div> */}
        </>
    )
}
export function CuacaBesok({ data }) {
    return (
        <>
            <div className="px-14">
                <h2 className='text-2x1 font-bold text-gray-800 mb-6 border-b pb-2'>Cuaca besok</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {data.map((wilayah) => {
                        // if (wilayah.status || wilayah.error) return null
                        if (wilayah.status || wilayah.error) {
                            return (
                                <div key={wilayah.id} className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                                    <div>
                                        <h3 className="font-bold text-red-800 text-lg">{wilayah.label || "Tanpa Nama"}</h3>
                                        <p className="text-xs text-gray-500">ID: {wilayah.id}</p>
                                        <p className="text-sm text-red-600 mt-2">❌ {wilayah.status || wilayah.error}</p>
                                    </div>
                                </div>
                            )
                        }
                        const besok = wilayah.besok[4] || wilayah.besok[0]
                        return (
                            <div key={wilayah.id} className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-100 flex flex-col justify-between">
                                {/* Bagian Atas: Gambar/Icon Cuaca */}
                                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-6 flex flex-col items-center text-white">
                                    <img className="w-20 h-20 object-contain drop-shadow-md" src={besok.icon} alt={besok.kondisi} />
                                    <h4 className="text-3xl font-black mt-2">{besok.suhu}</h4>
                                    <p className="text-sm font-medium opacity-90">{besok.kondisi}</p>
                                </div>
                                {/* Bagian Konten */}
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 truncate">{wilayah.lokasi.desa}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{wilayah.lokasi.kecamatan}, {wilayah.lokasi.kabkota}</p>
                                        <p className="text-xs text-gray-400">🕒 {besok.waktu_lokal} WIB</p>
                                    </div>
                                    <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition">
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <h2 className="px-14 text-xl font-medium text-black">Cuaca Besok</h2>
            <div className=" flex justify-center items-center  ">
                <div className=" flex justify-center items-center h-screen bg-gray-100 ">
                <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-5  ">
                <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                    <img class="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card Image"></img>
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">jawa barat</h3>
                        <p className="text-gray-600 mb-4">Tanggal</p>
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Lihat Detail
                        </button>
                    </div>

                </div>
            </div> */}
        </>
    )
}
export function CuacaLusa({ data }) {
    return (
        <>
        <div className="px-14">
                <h2 className='text-2x1 font-bold text-gray-800 mb-6 border-b pb-2'>Cuaca Lusa</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {data.map((wilayah) => {
                        // if (wilayah.status || wilayah.error) return null
                        if (wilayah.status || wilayah.error) {
                            return (
                                <div key={wilayah.id} className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                                    <div>
                                        <h3 className="font-bold text-red-800 text-lg">{wilayah.label || "Tanpa Nama"}</h3>
                                        <p className="text-xs text-gray-500">ID: {wilayah.id}</p>
                                        <p className="text-sm text-red-600 mt-2">❌ {wilayah.status || wilayah.error}</p>
                                    </div>
                                </div>
                            )
                        }
                        const lusa = wilayah.lusa[4] || wilayah.lusa[0]
                        return (
                            <div key={wilayah.id} className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-100 flex flex-col justify-between">
                                {/* Bagian Atas: Gambar/Icon Cuaca */}
                                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-6 flex flex-col items-center text-white">
                                    <img className="w-20 h-20 object-contain drop-shadow-md" src={lusa.icon} alt={lusa.kondisi} />
                                    <h4 className="text-3xl font-black mt-2">{lusa.suhu}</h4>
                                    <p className="text-sm font-medium opacity-90">{lusa.kondisi}</p>
                                </div>
                                {/* Bagian Konten */}
                                <div className="p-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800 truncate">{wilayah.lokasi.desa}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{wilayah.lokasi.kecamatan}, {wilayah.lokasi.kabkota}</p>
                                        <p className="text-xs text-gray-400">🕒 {lusa.waktu_lokal} WIB</p>
                                    </div>
                                    <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition">
                                        Lihat Detail
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* <h2 className="px-14 text-xl font-medium text-black">Cuaca Lusa</h2>
            <div className=" flex justify-center items-center  ">
                <div className=" flex justify-center items-center h-screen bg-gray-100 ">
                <div className=" grid grid-cols-1 sm:grid-cols-2  md:grid-cols-2 lg:grid-cols-4 gap-5  ">
                <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                    <img class="w-full h-48 object-cover" src="https://via.placeholder.com/400" alt="Card Image"></img>
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">jawa barat</h3>
                        <p className="text-gray-600 mb-4">Tanggal</p>
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                            Lihat Detail
                        </button>
                    </div>

                </div>
            </div> */}
        </>
    )
}
