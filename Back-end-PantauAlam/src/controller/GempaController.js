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
export const getGempaTerkiniKoordinat = async (req, res) => {
    try {
        const { Coordinates } = req.params; 
        if (!Coordinates) return response(400, null, 'Koordinat wajib diisi', res);
        
        const API  = `https://data.bmkg.go.id/DataMKG/TEWS/gempaterkini.json`;
        const resBMKG = await fetch(API)
        const dataBMKG = await resBMKG.json() 
        const listGempa = dataBMKG?.Infogempa?.gempa || null;

        if (!listGempa) {
            return response(404, null, 'Informasi gempa terbaru belum tersedia', res);
        }   
        const dataGempa = listGempa.find(gempa => gempa.Coordinates === Coordinates);

        if (!dataGempa) {
            return response(404, null, `Gempa dengan koordinat ${Coordinates} tidak ditemukan`, res);
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
            potensi: dataGempa.Potensi,
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
export const getGempaDirasakanKoordinat = async (req, res) => {
    try {
        const { Coordinates } = req.params;
        if (!Coordinates) return response(400, null, 'Koordinat wajib diisi', res);
        const API  = `https://data.bmkg.go.id/DataMKG/TEWS/gempadirasakan.json`;
        const resBMKG = await fetch(API)
        const dataBMKG = await resBMKG.json() 
        const listGempa = dataBMKG?.Infogempa?.gempa || null;

        if (!listGempa) {
            return response(404, null, 'Informasi gempa terbaru belum tersedia', res);
        }
        const dataGempa = listGempa.find(gempa => gempa.Coordinates === Coordinates);

        if (!dataGempa) {
            return response(404, null, `Gempa dengan koordinat ${Coordinates} tidak ditemukan`, res);
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
            Dirasakan: dataGempa.Dirasakan,
            Sumber: "https://data.bmkg.go.id"
        } 
        
        response(200, formatGempa, 'Success', res)
    } catch (error) {
        response(500, null, error.message, res);
    }
}