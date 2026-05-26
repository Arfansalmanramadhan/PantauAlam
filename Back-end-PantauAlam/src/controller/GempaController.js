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
            magnitudo: `${dataGempa.Magnitude} SR`,
            wilayah: dataGempa.Wilayah,
            potensi: dataGempa.Potensi,
            peta_shakemap: dataGempa.Shakemap ? `https://data.bmkg.go.id/DataMKG/TEWS/${dataGempa.Shakemap}` : null,
            Sumber: "https://data.bmkg.go.id"
        }
        response(200, formatGempa, 'Success', res)
    } catch (error) {
        response(500, null, error.message, res);
    }
}