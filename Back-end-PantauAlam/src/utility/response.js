const response = (statusCode, data, message, res) => {
    res.status(statusCode).json({ 
        payload:data,  
        message: message,
        pagination: {
            prey: "",
            next: "",
            max: ""
        }
    })
}
export default response