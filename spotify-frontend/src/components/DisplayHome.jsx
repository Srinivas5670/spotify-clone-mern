import { useContext } from "react";
import AlbumItem from "./AlbumItem";
import Navbar from "./Navbar";
import SongsItem from "./SongsItem";
import { PlayerContext } from "./../context/PlayerContext";

function DisplayHome() {
    const { songsData, albumsData } = useContext(PlayerContext);

    return (
        <>
            <Navbar />

            {/* Featured Charts */}
            <div className="mb-6">
                <h1 className="my-4 sm:my-5 font-bold text-xl sm:text-2xl">
                    Featured Charts
                </h1>

                <div
                    className="
                        flex
                        gap-3
                        sm:gap-4
                        overflow-x-auto
                        overflow-y-hidden
                        pb-2
                        scrollbar-hide
                    "
                >
                    {albumsData.map((item) => (
                        <div
                            key={item._id}
                            className="
                                flex-shrink-0
                                w-[140px]
                                sm:w-[160px]
                                md:w-[180px]
                            "
                        >
                            <AlbumItem
                                image={item.image}
                                name={item.name}
                                desc={item.desc}
                                id={item._id}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Today's Biggest Hits */}
            <div className="mb-6">
                <h1 className="my-4 sm:my-5 font-bold text-xl sm:text-2xl">
                    Today&apos;s biggest hits
                </h1>

                <div
                    className="
                        flex
                        gap-3
                        sm:gap-4
                        overflow-x-auto
                        overflow-y-hidden
                        pb-2
                        scrollbar-hide
                    "
                >
                    {songsData.map((item) => (
                        <div
                            key={item._id}
                            className="
                                flex-shrink-0
                                w-[140px]
                                sm:w-[160px]
                                md:w-[180px]
                            "
                        >
                            <SongsItem
                                image={item.image}
                                name={item.name}
                                desc={item.desc}
                                id={item._id}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DisplayHome;