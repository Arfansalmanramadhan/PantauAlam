import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import response from '../utility/response.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePathWilayah = path.join(__dirname, '../data/api/wilayah.json');
let cuacaCache = null;
let lastFetchTime = null;
const folderVillages = path.join(__dirname, '../data/api/village/');
export const getCuaca = async (req, res) => {
    try {
        const waktuMinimalSelesai = 15 * 60 * 1000; // 10 menit dalam milidetik
        if (cuacaCache  && (Date.now() - lastFetchTime < waktuMinimalSelesai)) {
            return response(200, cuacaCache, 'Success (Cached)', res);
        }
        if (!fs.existsSync(filePathWilayah)) {
            return response(404, null, 'File wilayah.json tidak ditemukan', res);
        }

        const rawData = fs.readFileSync(filePathWilayah, 'utf8');
        const daftarWilayah = JSON.parse(rawData);

        const dataCuaca = await Promise.all(
            daftarWilayah.slice(0, 100).map(async (wilayah) => {
                try {
                    // JANGAN hapus titik, gunakan ID asli (misal: 12.01.01.1001)
                    const api_url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${wilayah.id}`;

                    const resBMKG = await fetch(api_url);
                    const dataBMKG = await resBMKG.json();
                    
                    // Cek apakah 'data' ada dan tidak kosong
                    if (!dataBMKG.data || dataBMKG.data.length === 0) {
                        return { 
                            id: wilayah.id, 
                            label: wilayah.label, 
                            status: "Data tidak ditemukan di BMKG" 
                        };
                    }

                    // BMKG struktur cuacanya: data[0].cuaca[hari][jam]
                    // Kita ambil hari pertama, jam pertama yang tersedia
                    const hariPertama = dataBMKG.data[0].cuaca[0] || [];
                    const item = dataBMKG.data[0];
                    const lokasi = item.lokasi
                    const current = hariPertama[0] || {};
                    const formatDataCuaca = (hariArray) => {
                        if (!hariArray) return [];
                        return hariArray.map(jam => ({
                            waktu_lokal: jam.local_datetime,
                            suhu: `${jam.t}°C`,
                            kondisi: jam.weather_desc,
                            kelembapan: `${jam.hu}%`,
                            kecepatan_angin: `${jam.ws} km/jam`,
                            arah_angin: jam.wd,
                            jarak_pandang: jam.vs_text,
                            icon: jam.image
                        }));
                    };
                    return {
                        id: wilayah.id,
                        lokasi: {
                            provinsi: dataBMKG.lokasi.provinsi,
                            kabkota: dataBMKG.lokasi.kotkab,
                            kecamatan: dataBMKG.lokasi.kecamatan,
                            desa: dataBMKG.lokasi.desa,
                            lon: dataBMKG.lokasi.lon,
                            lat: dataBMKG.lokasi.lat,
                        },
                        cuaca_sekarang: {
                            suhu: `${current.t}°C`,
                            kelembapan: `${current.hu}%`,
                            kondisi: current.weather_desc,
                            angin: `${current.ws} km/jam`,
                            jarak_pandang: current.vs_text,
                            waktu_lokal: current.local_datetime,
                            arah_angin: current.wd, 
                            icon: current.image
                        },
                        hari_ini: formatDataCuaca(item.cuaca[0]),
                        besok: formatDataCuaca(item.cuaca[1]),
                        lusa: formatDataCuaca(item.cuaca[2]),
                        sumber: "BMKG"
                    };
                } catch (err) {
                    return { id: wilayah.id, label: wilayah.label, error: "Gagal memproses data" };
                }
            })
        );
        cuacaCache = dataCuaca;
        lastFetchTime = Date.now();
        response(200, dataCuaca, 'Success', res);

    } catch (error) {
        response(500, null, error.message, res);
    }
};
export const getCuacaByID = async (req, res) => {
    try {
        const { id_wilayah } = req.query; // Input misal: 3171031004 atau 31.71.03.1004

        if (!id_wilayah) return response(400, null, 'ID Wilayah wajib diisi', res);

        // 1. Standarisasi ID: Pastikan ada titik di tempat yang benar (Format Kemendagri)
        // Jika input tanpa titik, kita pasang titiknya secara manual
        let formattedId = id_wilayah.replace(/\./g, ''); 
        if (formattedId.length === 10) {
            formattedId = `${formattedId.substring(0,2)}.${formattedId.substring(2,4)}.${formattedId.substring(4,6)}.${formattedId.substring(6,10)}`;
        }

        // 2. Tembak API BMKG
        const api_url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${formattedId}`;
        
        const resBMKG = await fetch(api_url);
        const dataBMKG = await resBMKG.json();

        // 3. Jika adm4 kosong, coba tembak adm3 (Kecamatan) sebagai cadangan
        if (!dataBMKG.data || dataBMKG.data.length === 0) {
            const idKecamatan = formattedId.substring(0, 8); // Ambil sampai digit ke-3 (31.71.03)
            const resKec = await fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm3=${idKecamatan}`);
            const dataKec = await resKec.json();
            
            if (!dataKec.data || dataKec.data.length === 0) {
                return response(404, null, 'Wilayah tidak ditemukan di database BMKG', res);
            }
            
            return response(200, {
                info: "Data menggunakan level Kecamatan (Fallback)",
                data: dataKec.data[0]
            }, 'Success', res);
        }

        response(200, dataBMKG.data[0], 'Success', res);

    } catch (error) {
        response(500, null, error.message, res);
    }
};
//  http://localhost:5000/api/cuaca?id_wilayah=31.71.03.1004