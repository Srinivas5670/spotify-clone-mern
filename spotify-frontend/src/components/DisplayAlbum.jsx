import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { useContext, useEffect, useState } from "react";

const DisplayAlbum = ({ album }) => {
    const { id } = useParams();

    const [albumData, setAlbumData] = useState(null);
    const [hoveredSongId, setHoveredSongId] = useState(null);

    const {
        playWithId,
        albumsData,
        songsData,
        track,
        pause,
        playStatus,
    } = useContext(PlayerContext);

    useEffect(() => {
        const currentAlbum = albumsData.find(
            (item) => item._id === id
        );

        setAlbumData(currentAlbum || null);
    }, [albumsData, id]);

    const handleMouseEnter = (songId) => {
        setHoveredSongId(songId);
    };

    const handleMouseLeave = () => {
        setHoveredSongId(null);
    };

    const handleSongKeyDown = (event, songId, isPlaying) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();

            if (isPlaying) {
                pause();
            } else {
                playWithId(songId);
            }
        }
    };

    if (!albumData) {
        return (
            <div className="flex items-center justify-center h-full text-gray-400">
                Album not found
            </div>
        );
    }

    const albumSongs = songsData.filter(
        (item) => item.album === albumData.name
    );

    return (
        <>
            <Navbar />

            {/* ================= ALBUM HEADER ================= */}
            <div className="mt-6 sm:mt-10 flex flex-col md:flex-row md:items-end gap-5 sm:gap-8">

                <img
                    className="w-36 h-36 sm:w-48 sm:h-48 object-cover rounded shadow-lg"
                    src={albumData.image}
                    alt={`${albumData.name} album cover`}
                />

                <div className="flex flex-col gap-2 sm:gap-3 min-w-0">

                    <p className="text-sm">
                        Playlist
                    </p>

                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold break-words">
                        {albumData.name}
                    </h2>

                    <h4 className="text-sm sm:text-base text-gray-300">
                        {albumData.desc}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">

                        <div className="flex items-center">
                            <img
                                className="inline-block w-5 mr-2"
                                src={assets.spotify_logo}
                                alt=""
                                aria-hidden="true"
                            />

                            <b>Spotify</b>
                        </div>

                        <div className="text-gray-300">
                            <span>• 1,323,154 likes</span>
                            <b> • 50 songs </b>
                            <span>- about 2 hr. 30 min.</span>
                        </div>

                    </div>
                </div>
            </div>


            {/* ================= SONG HEADER ================= */}
            <div
                className="
                    grid
                    grid-cols-[35px_1fr_55px]
                    sm:grid-cols-[40px_2fr_1fr_55px]
                    gap-2
                    mt-8
                    sm:mt-10
                    mb-3
                    px-2
                    text-[#a7a7a7]
                    text-sm
                "
            >
                <p aria-hidden="true">#</p>

                <p>Title</p>

                <p className="hidden sm:block">
                    Date Added
                </p>

                <img
                    className="m-auto w-4"
                    src={assets.clock_icon}
                    alt="Duration"
                />
            </div>

            <hr className="border-gray-700" />


            {/* ================= SONG LIST ================= */}
            <div className="pb-6">

                {albumSongs.length > 0 ? (
                    albumSongs.map((item, index) => {

                        const isCurrentSong =
                            track?._id === item._id;

                        const isHovered =
                            hoveredSongId === item._id;

                        const isPlaying =
                            isCurrentSong && playStatus;

                        return (
                            <div
                                key={item._id}
                                role="button"
                                tabIndex={0}
                                aria-label={
                                    isPlaying
                                        ? `Pause ${item.name}`
                                        : `Play ${item.name}`
                                }
                                aria-pressed={isPlaying}
                                onClick={() => {
                                    if (isPlaying) {
                                        pause();
                                    } else {
                                        playWithId(item._id);
                                    }
                                }}
                                onKeyDown={(event) =>
                                    handleSongKeyDown(
                                        event,
                                        item._id,
                                        isPlaying
                                    )
                                }
                                onMouseEnter={() =>
                                    handleMouseEnter(item._id)
                                }
                                onMouseLeave={handleMouseLeave}
                                onFocus={() =>
                                    handleMouseEnter(item._id)
                                }
                                onBlur={() =>
                                    handleMouseLeave()
                                }
                                className="
                                    grid
                                    grid-cols-[35px_1fr_55px]
                                    sm:grid-cols-[40px_2fr_1fr_55px]
                                    gap-2
                                    p-2
                                    sm:p-3
                                    items-center
                                    text-[#a7a7a7]
                                    hover:bg-[#ffffff26]
                                    focus:bg-[#ffffff26]
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-white
                                    rounded
                                    cursor-pointer
                                    transition
                                "
                            >

                                {/* SONG NUMBER / PLAY ICON */}
                                <div
                                    className="flex items-center justify-center"
                                    aria-hidden="true"
                                >

                                    {isPlaying ? (
                                        <img
                                            className="w-5 h-5"
                                            src={
                                                isHovered
                                                    ? assets.pause_icon
                                                    : assets.music_gif
                                            }
                                            alt=""
                                        />
                                    ) : isHovered ? (
                                        <img
                                            className="w-4 h-4"
                                            src={assets.play_icon}
                                            alt=""
                                        />
                                    ) : (
                                        <b className="text-sm">
                                            {index + 1}
                                        </b>
                                    )}

                                </div>


                                {/* SONG INFORMATION */}
                                <div className="flex items-center gap-3 min-w-0">

                                    <img
                                        className="
                                            w-9
                                            h-9
                                            sm:w-10
                                            sm:h-10
                                            rounded
                                            object-cover
                                            flex-shrink-0
                                        "
                                        src={item.image}
                                        alt={`${item.name} cover`}
                                    />

                                    <div className="min-w-0">

                                        <p className="text-sm sm:text-[15px] font-bold text-white truncate">
                                            {item.name}
                                        </p>

                                        <p className="text-xs text-gray-400 truncate sm:hidden">
                                            {item.desc}
                                        </p>

                                    </div>
                                </div>


                                {/* DATE ADDED */}
                                <p className="text-sm hidden sm:block">
                                    5 days ago
                                </p>


                                {/* DURATION */}
                                <p className="text-xs sm:text-sm text-center">
                                    {item.duration}
                                </p>

                            </div>
                        );
                    })
                ) : (
                    <p
                        className="text-gray-400 text-center py-8"
                        role="status"
                    >
                        No songs available in this album.
                    </p>
                )}

            </div>
        </>
    );
};

export default DisplayAlbum;