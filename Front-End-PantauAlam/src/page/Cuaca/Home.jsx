import { useState, useEffect } from "react"
function HomeCuaca() {
    const [daftarCuaca, setDaftarCuaca] = useState([]);
    const [loading, setLoading] = useState(true);
    const [halaman, setHalaman] = useState(1);
    const [totalHalaman, setTotalHalaman] = useState(1);
    useEffect(() => {
        fetch(`http://localhost:8000/api/cuaca/?page=1&limit=10`)
            .then(response => response.json())
            .then(data => {
                const dataBersi = data.payload || data.data || data
                setDaftarCuaca(dataBersi)
                setLoading(false)
                // console.log('data cuaca berhasil dimuat', data)
            })
            .catch(err => {
                console.error('gagal memuat data cuaca', err)
            })
            .finally(() =>
                setLoading(false)

            )
    }, [])
    const listWilayah = daftarCuaca?.data?.payload || daftarCuaca?.payload || [];
    return (
        <>
            <div className="px-14">
                <h2 className='text-2x1 font-bold text-gray-800 mb-6 border-b pb-2'>Cuaca saat ini</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {listWilayah
                        .map((wilayah) => {
                            // if (wilayah.status || wilayah.error) return null
                            if (wilayah.status || wilayah.error) {
                                return (
                                    <div key={wilayah.id} className="bg-red-50 border border-red-200 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                                        <div>
                                            <h3 className="font-bold text-red-800 text-lg">{wilayah.label || "Tanpa Nama"}</h3>
                                            {/* <p className="text-xs text-gray-500">ID: {wilayah.id}</p> */}
                                            <p className="text-sm text-red-600 mt-2">❌ {wilayah.status || wilayah.error}</p>
                                        </div>
                                    </div>
                                )
                            }
                            const skrg = wilayah.hari_ini[4] || wilayah.hari_ini[0]
                            const lokasi = wilayah.lokasi;
                            return (
                                <div key={wilayah.id} className="bg-gray-200 rounded-2xl shadow-md overflow-hidden transform hover:scale-105 transition duration-300 border border-gray-100 flex flex-col justify-between">

                                    {/* Bagian Atas: Icon & Suhu */}
                                    <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-6 flex flex-col items-center text-white">
                                        <img className="w-20 h-20 object-contain drop-shadow-md" src={skrg?.icon} alt={skrg?.kondisi} />
                                        <h4 className="text-3xl font-black mt-2">{skrg?.suhu}</h4>
                                        <p className="text-sm font-medium opacity-90">{skrg?.kondisi}</p>
                                    </div>

                                    {/* Bagian Konten */}
                                    <div className="p-4 flex-1 flex flex-col justify-between ">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 truncate">{lokasi?.provinsi}</h3>
                                            <p className="text-xs text-white-10 mb-2">{lokasi?.desa}, {lokasi?.kecamatan}, {lokasi?.kabkota}</p>

                                            {/* TAMPILAN JAM UTK WIB/WITA/WIT AUTOMATIC */}
                                            <p className="text-xs text-white-10 font-semibold">
                                                {skrg?.waktu_lokal.substring(11, 16)}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            );
                        })}
                </div>

            </div>
        </>
    )
}
export default HomeCuaca