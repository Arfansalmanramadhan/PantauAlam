import Sidebar from "../../components/SIdebar"
import Main from "../../components/Main"
function Home() {
    return (
        <>
            <Sidebar />
            <Main>
                <div className=" flex justify-center items-center h-screen bg-gray-100 ">
                    <h1 className="text-3xl font-bold text-blue-600 underline">
                        Halo, Tailwind sudah aktif!
                    </h1>
                </div>
            </Main>
        </>
    )
}
export default Home