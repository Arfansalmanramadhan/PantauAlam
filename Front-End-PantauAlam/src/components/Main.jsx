function Main({ children, open }) {
    return (
        <main className={`flex-1 transition-all duration-300 py-6 px-4  sm:p-6  md:py-10 md:px-14 ${open ? "md:ml-64" : "ml-0"}`}>
            {children}
        </main>
    )
}
export default Main