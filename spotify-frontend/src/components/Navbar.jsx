import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";

function Navbar() {
    const navigate = useNavigate();

    return (
        <>
            <nav
                className="w-full flex justify-between items-center font-semibold"
                aria-label="Main navigation"
            >
                {/* Navigation arrows */}
                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        aria-label="Go back"
                        className="
                            w-8
                            h-8
                            bg-black
                            p-2
                            rounded-full
                            cursor-pointer
                            hover:bg-[#242424]
                            focus:outline-none
                            focus:ring-2
                            focus:ring-white
                        "
                    >
                        <img
                            src={assets.arrow_left}
                            alt=""
                            aria-hidden="true"
                        />
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(1)}
                        aria-label="Go forward"
                        className="
                            w-8
                            h-8
                            bg-black
                            p-2
                            rounded-full
                            cursor-pointer
                            hover:bg-[#242424]
                            focus:outline-none
                            focus:ring-2
                            focus:ring-white
                        "
                    >
                        <img
                            src={assets.arrow_right}
                            alt=""
                            aria-hidden="true"
                        />
                    </button>

                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 sm:gap-4">

                    <button
                        type="button"
                        className="
                            bg-white
                            text-black
                            text-sm
                            sm:text-[15px]
                            px-3
                            sm:px-4
                            py-1
                            rounded-2xl
                            hidden
                            md:block
                            cursor-pointer
                            hover:scale-105
                            focus:outline-none
                            focus:ring-2
                            focus:ring-white
                        "
                    >
                        Explore Premium
                    </button>

                    <button
                        type="button"
                        className="
                            bg-black
                            py-1
                            px-3
                            rounded-2xl
                            text-sm
                            sm:text-[15px]
                            cursor-pointer
                            hover:bg-[#242424]
                            focus:outline-none
                            focus:ring-2
                            focus:ring-white
                        "
                    >
                        Install App
                    </button>

                    <button
                        type="button"
                        aria-label="Profile"
                        className="
                            bg-sky-400
                            text-black
                            w-7
                            h-7
                            rounded-full
                            flex
                            items-center
                            justify-center
                            focus:outline-none
                            focus:ring-2
                            focus:ring-white
                        "
                    >
                        S
                    </button>

                </div>
            </nav>

            {/* Category navigation */}
            <div
                className="flex items-center gap-2 mt-4 overflow-x-auto pb-1"
                aria-label="Content categories"
            >
                <button
                    type="button"
                    className="
                        bg-white
                        text-black
                        px-4
                        py-1
                        rounded-2xl
                        cursor-pointer
                        flex-shrink-0
                        focus:outline-none
                        focus:ring-2
                        focus:ring-white
                    "
                >
                    All
                </button>

                <button
                    type="button"
                    className="
                        bg-black
                        text-white
                        px-4
                        py-1
                        rounded-2xl
                        cursor-pointer
                        flex-shrink-0
                        hover:bg-[#242424]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-white
                    "
                >
                    Music
                </button>

                <button
                    type="button"
                    className="
                        bg-black
                        text-white
                        px-4
                        py-1
                        rounded-2xl
                        cursor-pointer
                        flex-shrink-0
                        hover:bg-[#242424]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-white
                    "
                >
                    Podcasts
                </button>
            </div>
        </>
    );
}

export default Navbar;