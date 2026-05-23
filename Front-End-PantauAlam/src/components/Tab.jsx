
function Tab({ num, activee, onClick, label }) {
    return (
        <button
            type="button"
            onClick={() => onClick(num)}
            className={`px-4 py-2 rounded-lg text-white transition ${activee ? "bg-blue-600" : "bg-blue-400"}`}
        >
            {label}
        </button>


    )
}
export default Tab;