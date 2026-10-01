import { useContext } from "react";
import { assets } from "./../assets/frontend-assets/assets";
import { PlayerContext } from "../context/PlayerContext";

function Player() {
    const {
        track,
        seekBar,
        seekBg,
        play,
        pause,
        playStatus,
        time,
        nextSong,
        previusSong,
        seekSong,
        toggleLoop,
        isLooping,
        isShuffle,
        toggleShuffle,
        volume,
        handleVolumeChange,
        isMuted,
        toggleMute,
    } = useContext(PlayerContext);

    const formatTime = (minute, second) => {
        return `${minute}:${String(second).padStart(2, "0")}`;
    };

    if (!track) return null;

    return (
        <div className="h-[10%] min-h-[72px] bg-black text-white px-3 sm:px-4 flex items-center">

            {/* SONG INFORMATION */}
            <div className="hidden md:flex items-center gap-3 w-[25%] min-w-0">
                <img
                    className="w-10 h-10 lg:w-12 lg:h-12 object-cover rounded"
                    src={track.image}
                    alt={`${track.name} cover`}
                />

                <div className="min-w-0">
                    <p className="text-sm font-medium truncate">
                        {track.name}
                    </p>

                    <p className="text-xs text-gray-400 truncate">
                        {track.desc?.slice(0, 25)}
                    </p>
                </div>
            </div>

            {/* PLAYER CONTROLS */}
            <div className="flex flex-col items-center gap-1 w-full md:w-[50%]">

                <div className="flex items-center gap-4 sm:gap-5">

                    {/* Shuffle */}
                    <button
                        type="button"
                        onClick={toggleShuffle}
                        aria-label={
                            isShuffle
                                ? "Disable shuffle"
                                : "Enable shuffle"
                        }
                        aria-pressed={isShuffle}
                        className="p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <img
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                !isShuffle ? "opacity-40" : ""
                            }`}
                            src={assets.shuffle_icon}
                            alt=""
                        />
                    </button>

                    {/* Previous */}
                    <button
                        type="button"
                        onClick={previusSong}
                        aria-label="Previous song"
                        className="p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <img
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            src={assets.prev_icon}
                            alt=""
                        />
                    </button>

                    {/* Play / Pause */}
                    <button
                        type="button"
                        onClick={playStatus ? pause : play}
                        aria-label={
                            playStatus
                                ? "Pause song"
                                : "Play song"
                        }
                        className="p-1 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <img
                            className="w-7 h-7 sm:w-8 sm:h-8"
                            src={
                                playStatus
                                    ? assets.pause_icon
                                    : assets.play_icon
                            }
                            alt=""
                        />
                    </button>

                    {/* Next */}
                    <button
                        type="button"
                        onClick={nextSong}
                        aria-label="Next song"
                        className="p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <img
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            src={assets.next_icon}
                            alt=""
                        />
                    </button>

                    {/* Loop */}
                    <button
                        type="button"
                        onClick={toggleLoop}
                        aria-label={
                            isLooping
                                ? "Disable repeat"
                                : "Enable repeat"
                        }
                        aria-pressed={isLooping}
                        className="p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <img
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                !isLooping ? "opacity-40" : ""
                            }`}
                            src={assets.loop_icon}
                            alt=""
                        />
                    </button>
                </div>

                {/* PROGRESS */}
                <div className="flex items-center gap-2 sm:gap-3 w-full max-w-[650px]">

                    <p
                        className="text-[10px] sm:text-xs text-gray-400 w-7 text-right"
                        aria-label="Current time"
                    >
                        {formatTime(
                            time.currentTime.minute,
                            time.currentTime.second
                        )}
                    </p>

                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        role="slider"
                        aria-label="Song progress"
                        aria-valuemin="0"
                        aria-valuemax={time.totalTime.minute * 60 + time.totalTime.second}
                        aria-valuenow={time.currentTime.minute * 60 + time.currentTime.second}
                        tabIndex="0"
                        className="flex-1 h-1 bg-gray-500 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        <hr
                            ref={seekBar}
                            className="h-1 border-none w-0 bg-green-500 rounded-full pointer-events-none"
                        />
                    </div>

                    <p
                        className="text-[10px] sm:text-xs text-gray-400 w-7"
                        aria-label="Total time"
                    >
                        {formatTime(
                            time.totalTime.minute,
                            time.totalTime.second
                        )}
                    </p>
                </div>
            </div>

            {/* DESKTOP EXTRA CONTROLS */}
            <div className="hidden lg:flex items-center justify-end gap-3 w-[25%] opacity-75">

                <button
                    type="button"
                    aria-label="Now playing"
                    className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <img
                        className="w-4 h-4"
                        src={assets.plays_icon}
                        alt=""
                    />
                </button>

                <button
                    type="button"
                    aria-label="Lyrics"
                    className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <img
                        className="w-4 h-4"
                        src={assets.mic_icon}
                        alt=""
                    />
                </button>

                <button
                    type="button"
                    aria-label="Queue"
                    className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <img
                        className="w-4 h-4"
                        src={assets.queue_icon}
                        alt=""
                    />
                </button>

                <button
                    type="button"
                    aria-label="Audio output"
                    className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <img
                        className="w-4 h-4"
                        src={assets.speaker_icon}
                        alt=""
                    />
                </button>

                {/* Mute */}
                <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={
                        isMuted
                            ? "Unmute"
                            : "Mute"
                    }
                    aria-pressed={isMuted}
                    className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <img
                        className="w-4 h-4"
                        src={
                            !isMuted && volume !== 0
                                ? assets.volume_icon
                                : assets.mute_icon
                        }
                        alt=""
                    />
                </button>

                {/* Volume */}
                <label className="flex items-center">
                    <span className="sr-only">
                        Volume
                    </span>

                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        aria-label="Volume"
                        className="bg-gray-300 appearance-auto h-1 w-16 opacity-70 hover:opacity-100 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
                    />
                </label>

                <button
                    type="button"
                    aria-label="Mini player"
                    className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <img
                        className="w-4 h-4"
                        src={assets.mini_player_icon}
                        alt=""
                    />
                </button>

                <button
                    type="button"
                    aria-label="Fullscreen"
                    className="p-1 rounded focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <img
                        className="w-4 h-4"
                        src={assets.zoom_icon}
                        alt=""
                    />
                </button>
            </div>

            {/* MOBILE SONG IMAGE */}
            <div className="md:hidden absolute left-3 bottom-[11px]">
                <img
                    className="w-9 h-9 object-cover rounded"
                    src={track.image}
                    alt={`${track.name} cover`}
                />
            </div>
        </div>
    );
}

export default Player;