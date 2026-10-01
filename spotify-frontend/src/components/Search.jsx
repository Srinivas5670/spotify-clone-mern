import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/frontend-assets/assets";

function Search() {
    const { songsData, playWithId } = useContext(PlayerContext);
    const [searchText, setSearchText] = useState("");

    const filteredSongs = songsData.filter((song) => {
        const search = searchText.toLowerCase().trim();

        if (!search) {
            return true;
        }

        return (
            song.name?.toLowerCase().includes(search) ||
            song.desc?.toLowerCase().includes(search) ||
            song.album?.toLowerCase().includes(search)
        );
    });

    return (
        <div className="h-full overflow-y-auto">

            {/* Search Box */}
            <div className="flex items-center gap-3 bg-[#242424] rounded-full px-4 py-3 mb-6 max-w-[600px]">

                <img
                    src={assets.search_icon}
                    alt=""
                    aria-hidden="true"
                    className="w-5"
                />

                <label htmlFor="song-search" className="sr-only">
                    Search songs
                </label>

                <input
                    id="song-search"
                    type="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="What do you want to play?"
                    className="
                        bg-transparent
                        outline-none
                        text-white
                        placeholder-gray-400
                        w-full
                    "
                    autoComplete="off"
                />
            </div>

            {/* Heading */}
            <h1 className="text-xl sm:text-2xl font-bold mb-5">
                {searchText
                    ? `Search results for "${searchText}"`
                    : "Search songs"}
            </h1>

            {/* Results */}
            {filteredSongs.length > 0 ? (
                <div className="flex flex-col gap-2">

                    {filteredSongs.map((song) => (
                        <button
                            key={song._id}
                            type="button"
                            onClick={() => playWithId(song._id)}
                            className="
                                w-full
                                flex
                                items-center
                                gap-3
                                sm:gap-4
                                p-3
                                rounded
                                text-left
                                hover:bg-[#242424]
                                focus:outline-none
                                focus:ring-2
                                focus:ring-white
                                cursor-pointer
                                transition
                            "
                            aria-label={`Play ${song.name}`}
                        >
                            <img
                                src={song.image}
                                alt={`${song.name} cover`}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded object-cover flex-shrink-0"
                            />

                            <div className="min-w-0">
                                <p className="font-semibold truncate text-white">
                                    {song.name}
                                </p>

                                <p className="text-sm text-gray-400 truncate">
                                    {song.album}
                                </p>
                            </div>

                            <p className="ml-auto text-xs sm:text-sm text-gray-400 flex-shrink-0">
                                {song.duration}
                            </p>
                        </button>
                    ))}

                </div>
            ) : (
                <div
                    className="text-gray-400 mt-8"
                    role="status"
                >
                    No songs found.
                </div>
            )}
        </div>
    );
}

export default Search;