import response from '../utility/response.js';

export const getGempa = async (req, res) => {
    try {
        const API  = `https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json`;
        const resBMKG = await fetch(API)
        const dataBMKG = await resBMKG.json() 
        const dataGempa = dataBMKG?.Infogempa?.gempa || null;

        if (!dataGempa) {
            return response(404, null, 'Informasi gempa terbaru belum tersedia', res);
        }   
        const formatGempa = {
            tanggal: dataGempa.Tanggal,
            jam: dataGempa.Jam,
            DateTime: dataGempa.DateTime,
            Coordinates: dataGempa.Coordinates,
            Lintang:dataGempa.Lintang,
            Bujur: dataGempa.Bujur,
            magnitudo: `${dataGempa.Magnitude} SR`,
            Kedalaman: dataGempa.Kedalaman,
            wilayah: dataGempa.Wilayah,
            potensi: dataGempa.Potensi,
            Dirasakan: dataGempa.Dirasakan,
            peta_shakemap: dataGempa.Shakemap ? `https://data.bmkg.go.id/DataMKG/TEWS/${dataGempa.Shakemap}` : null,
            Sumber: "https://data.bmkg.go.id"
        }
        response(200, formatGempa, 'Success', res)
    } catch (error) {
        response(500, null, error.message, res);
    }
}
export const getGempaTerkini = async (req, res) => {
    try {
        const API  = `https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json`;
        const resBMKG = await fetch(API)
        const dataBMKG = await resBMKG.json() 
        const listGempa = dataBMKG?.Infogempa?.gempa || null;

        if (!listGempa) {
            return response(404, null, 'Informasi gempa terbaru belum tersedia', res);
        }   
        const formatGempa = listGempa.map((dataGempa) => ({

            tanggal: dataGempa.Tanggal,
            jam: dataGempa.Jam,
            DateTime: dataGempa.DateTime,
            Coordinates: dataGempa.Coordinates,
            Lintang: dataGempa.Lintang,
            Bujur: dataGempa.Bujur,
            magnitudo: `${dataGempa.Magnitude} SR`,
            Kedalaman: dataGempa.Kedalaman,
            wilayah: dataGempa.Wilayah,
            Sumber: "https://data.bmkg.go.id"
        }))  
        
        response(200, formatGempa, 'Success', res)
    } catch (error) {
        response(500, null, error.message, res);
    }
}
export const getGempaTerkiniTanggal = async (req, res) => {
    try {
        const { Tanggal } = req.params; // Format input: "2024-06-01"
        if (!Tanggal) return response(400, null, 'Tanggal wajib diisi', res);
        const dateObj = new Date(Tanggal);
        
        // Validasi jika input tanggal dari user tidak valid (misal: "bukan-tanggal")
        if (isNaN(dateObj.getTime())) {
            return response(400, null, 'Format tanggal salah. Gunakan format YYYY-MM-DD (Contoh: 2026-06-13)', res);
        }

        // Gunakan Intl.DateTimeFormat untuk mengubah ke format Indonesia
        const formatter = new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        
        // Hasilnya berbentuk: "13 Juni 2026" atau "13 Jun 2026"
        // Kita bersihkan titik (.) jika ada, karena format singkat bawaan JS kadang menyertakan titik (ex: "Jun.")
        let tanggalFormatBMKG = formatter.format(dateObj).replace('.', ''); 
        
        // Tambahan jaga-jaga: BMKG menggunakan nama bulan singkat tanpa titik (ex: "Agu", "Okt")
        // Sedangkan default JS 'id-ID' untuk Juni terkadang ditulis "Juni" lengkap atau "Jun", kita pastikan formatnya aman
        // --------------------------------------
        const API  = `https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json`;
        const resBMKG = await fetch(API)
        const dataBMKG = await resBMKG.json() 
        const listGempa = dataBMKG?.Infogempa?.gempa || null;

        if (!listGempa) {
            return response(404, null, 'Informasi gempa terbaru belum tersedia', res);
        }   
        const dataGempa = listGempa.find(gempa => {
            // Kita samakan huruf kecil semua agar tidak sensitif huruf besar/kecil
            const tglBMKG = gempa.Tanggal.toLowerCase();
            const tglCari = tanggalFormatBMKG.toLowerCase();
            
            // Mengatasi perbedaan singkatan bulan (misal "Juni" di JS vs "Jun" di BMKG)
            return tglBMKG.includes(tglCari.substring(0, 5)) || tglCari.includes(tglBMKG.substring(0, 5));
        });
        if (!dataGempa) {
            return response(404, null, 'Tidak ada gempa yang ditemukan untuk tanggal tersebut', res);
        }
        const formatGempa = {

            tanggal: dataGempa.Tanggal,
            jam: dataGempa.Jam,
            DateTime: dataGempa.DateTime,
            Coordinates: dataGempa.Coordinates,
            Lintang: dataGempa.Lintang,
            Bujur: dataGempa.Bujur,
            magnitudo: `${dataGempa.Magnitude} SR`,
            Kedalaman: dataGempa.Kedalaman,
            wilayah: dataGempa.Wilayah,
            Sumber: "https://data.bmkg.go.id"
        }
        
        response(200, formatGempa, 'Success', res)
    } catch (error) {
        response(500, null, error.message, res);
    }
}
export const getGempaDirasakan = async (req, res) => {
    try {
        const API  = `https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json`;
        const resBMKG = await fetch(API)
        const dataBMKG = await resBMKG.json() 
        const listGempa = dataBMKG?.Infogempa?.gempa || null;

        if (!listGempa) {
            return response(404, null, 'Informasi gempa terbaru belum tersedia', res);
        }   
        const formatGempa = listGempa.map((dataGempa) => ({

            tanggal: dataGempa.Tanggal,
            jam: dataGempa.Jam,
            DateTime: dataGempa.DateTime,
            Coordinates: dataGempa.Coordinates,
            Lintang: dataGempa.Lintang,
            Bujur: dataGempa.Bujur,
            magnitudo: `${dataGempa.Magnitude} SR`,
            Kedalaman: dataGempa.Kedalaman,
            wilayah: dataGempa.Wilayah,
            Sumber: "https://data.bmkg.go.id"
        }))  
        
        response(200, formatGempa, 'Success', res)
    } catch (error) {
        response(500, null, error.message, res);
    }
}