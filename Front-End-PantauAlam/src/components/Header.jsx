import { useState, useEffect } from "react";

function Header() {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <>
            <div className="flex items-center justify-between p-4 bg-blue-400 text-white p-4 rounded-lg mb-4 left-20">
                <h1 className="text-2xl font-bold">Pantau Alam</h1>
                <div className="mt-4 text-right">
                    <p className="text-2xl font-bold tracking-wider">{time.toLocaleTimeString("id-ID")}</p>
                    <p className="text-sm mt-1">{time.toLocaleDateString("id-ID", {
                        weekday: "long", year: "numeric", month: "long", day: "numeric",
                    })}
                    </p>
                </div>
            </div>
        </>
    )
}
export default Header