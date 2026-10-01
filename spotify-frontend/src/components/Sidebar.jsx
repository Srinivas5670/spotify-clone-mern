import { useNavigate, useLocation } from "react-router-dom";
import { assets } from "./../assets/frontend-assets/assets";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === "/";
    const isSearch = location.pathname === "/search";

    return (
        <>
            {/* ================= DESKTOP SIDEBAR ================= */}
            <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">

                {/* Home + Search */}
                <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">

                    <div
                        onClick={() => navigate("/")}
                        className={`flex items-center gap-3 pl-8 cursor-pointer transition ${
                            isHome ? "text-white" : "text-gray-400 hover:text-white"
                        }`}
                    >
                        <img
                            className="w-6"
                            src={assets.home_icon}
                            alt="home"
                        />
                        <p className="font-bold">Home</p>
                    </div>

                    <div
                        onClick={() => navigate("/search")}
                        className={`flex items-center gap-3 pl-8 cursor-pointer transition ${
                            isSearch ? "text-white" : "text-gray-400 hover:text-white"
                        }`}
                    >
                        <img
                            className="w-6"
                            src={assets.search_icon}
                            alt="search"
                        />
                        <p className="font-bold">Search</p>
                    </div>

                </div>

                {/* Library */}
                <div className="bg-[#121212] flex-1 rounded p-4 overflow-hidden">

                    <div className="flex items-center justify-between mb-4">

                        <div className="flex items-center gap-3">
                            <img
                                className="w-6"
                                src={assets.stack_icon}
                                alt="library"
                            />

                            <p className="font-bold">Your Library</p>
                        </div>

                        <img
                            className="w-5 cursor-pointer opacity-70 hover:opacity-100"
                            src={assets.plus_icon}
                            alt="add"
                        />

                    </div>

                    {/* Library content */}
                    <div className="text-gray-400 text-sm">
                        <p className="mb-2">
                            Create your playlists and save your favorite music.
                        </p>

                        <button className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:scale-105 transition">
                            Create playlist
                        </button>
                    </div>

                </div>
            </div>


            {/* ================= MOBILE / TABLET BOTTOM NAVIGATION ================= */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-[#121212] border-t border-gray-800 z-50">

                <div className="h-full flex items-center justify-around">

                    {/* HOME */}
                    <button
                        onClick={() => navigate("/")}
                        className={`flex flex-col items-center justify-center gap-1 min-w-[60px] ${
                            isHome ? "text-white" : "text-gray-500"
                        }`}
                    >
                        <img
                            src={assets.home_icon}
                            alt="home"
                            className="w-5 h-5"
                        />

                        <span className="text-[11px]">
                            Home
                        </span>
                    </button>


                    {/* SEARCH */}
                    <button
                        onClick={() => navigate("/search")}
                        className={`flex flex-col items-center justify-center gap-1 min-w-[60px] ${
                            isSearch ? "text-white" : "text-gray-500"
                        }`}
                    >
                        <img
                            src={assets.search_icon}
                            alt="search"
                            className="w-5 h-5"
                        />

                        <span className="text-[11px]">
                            Search
                        </span>
                    </button>


                    {/* LIBRARY */}
                    <button
                        className="flex flex-col items-center justify-center gap-1 min-w-[60px] text-gray-500"
                    >
                        <img
                            src={assets.stack_icon}
                            alt="library"
                            className="w-5 h-5"
                        />

                        <span className="text-[11px]">
                            Library
                        </span>
                    </button>

                </div>
            </div>
        </>
    );
}

export default Sidebar;