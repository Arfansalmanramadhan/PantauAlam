import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import response from '../utility/response.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cuacaDataPath = path.join(__dirname, '../data/api/district/');

export const getCuaca = async (req, res) => {
    try {
        if (!fs.existsSync(cuacaData)) {
            return response(404, null, 'Folder data tidak ditemukan', res);
        }

        const files = fs.readdirSync(cuacaData);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        const dataCuaca = await Promise.all(
            jsonFiles.slice(0, 5).map(async (file) => {
                const filePath = path.join(cuacaData, file);
                const conten = JSON.parse(fs.readFileSync(filePath, 'utf8'));

                const cleanId = conten.id.toString().replace(/\./g, '');
                
                // LOGIKA DINAMIS: Cek panjang ID
                // Jika 7 digit pakai adm3 (Kecamatan), jika 10 digit pakai adm4 (Desa)
                const paramType = cleanId.length === 7 ? 'adm3' : 'adm4';
                const api_url = `https://api.bmkg.go.id/publik/prakiraan-cuaca?${paramType}=${cleanId}`;

                try {
                    const resBMKG = await fetch(api_url);
                    const dataBMKG = await resBMKG.json();

                    // Cek apakah data ada
                    if (!dataBMKG.data || dataBMKG.data.length === 0) {
                        return { 
                            id_wilayah: conten.id, 
                            nama: conten.name, 
                            error: `ID ${cleanId} tidak ditemukan di BMKG sebagai ${paramType}` 
                        };
                    }

                    // Ambil data cuaca (flatting array 2 dimensi dari BMKG)
                    const cuacaFlat = dataBMKG.data[0].cuaca?.flat() || [];
                    const current = cuacaFlat[0] || {};

                    return {
                        id_wilayah: conten.id,
                        nama_wilayah: conten.name,
                        level_wilayah: paramType === 'adm3' ? 'Kecamatan' : 'Desa',
                        info_cuaca: {
                            temp: current.t,               // Parameter 't' dari API
                            humidity: current.hu,          // Parameter 'hu' dari API
                            kondisi: current.weather_desc,
                            icon: current.image,
                            waktu: current.local_datetime
                        }
                    };
                } catch (err) {
                    return { id_wilayah: conten.id, error: "Koneksi ke BMKG terputus" };
                }
            })
        );

        response(200, dataCuaca, 'Success', res);
    } catch (error) {
        response(500, null, error.message, res);
    }
}