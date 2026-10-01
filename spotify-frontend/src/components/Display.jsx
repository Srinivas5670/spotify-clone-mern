import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Search from "./Search";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";

function Display() {
    const { albumsData } = useContext(PlayerContext);

    const displayRef = useRef();
    const location = useLocation();

    const isAlbum = location.pathname.includes("album");

    const albumId = isAlbum
        ? location.pathname.split("/").pop()
        : "";

    const currentAlbum = albumsData.find(
        (album) => album._id === albumId
    );

    const bgColor = currentAlbum?.bgColour || "#121212";

    useEffect(() => {
        if (!displayRef.current) return;

        if (isAlbum && currentAlbum) {
            displayRef.current.style.background =
                `linear-gradient(${bgColor}, #121212)`;
        } else {
            displayRef.current.style.background = "#121212";
        }
    }, [isAlbum, currentAlbum, bgColor]);

    return (
        <div
            ref={displayRef}
            className="
                flex-1
                m-1
                sm:m-2
                px-3
                sm:px-5
                lg:px-6
                pt-3
                sm:pt-4
                rounded
                bg-[#121212]
                text-white
                overflow-hidden
                min-w-0
                h-full
            "
        >
            <div className="h-full overflow-y-auto pb-24 lg:pb-6">

                <Routes>

                    {/* HOME */}
                    <Route
                        path="/"
                        element={<DisplayHome />}
                    />

                    {/* SEARCH */}
                    <Route
                        path="/search"
                        element={<Search />}
                    />

                    {/* ALBUM */}
                    <Route
                        path="/album/:id"
                        element={
                            currentAlbum ? (
                                <DisplayAlbum album={currentAlbum} />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-400">
                                        Album not found
                                    </p>
                                </div>
                            )
                        }
                    />

                </Routes>

            </div>
        </div>
    );
}

export default Display;