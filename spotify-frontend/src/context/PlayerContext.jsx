import { createContext, useEffect, useRef, useState } from "react";
import api from "../api/api";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBar = useRef();
    const seekBg = useRef();

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(songsData[0]);

    const [isLoading, setIsLoading] = useState(true);
    const [apiError, setApiError] = useState("");

    const [playStatus, setPlayStatus] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [originalSongsData, setOriginalSongsData] = useState([]);
    const [isShuffle, setIsShuffle] = useState(false);

    const [volume, setVolume] = useState(0.5);
    const [previousVolume, setPreviousVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    // -----------------------------
    // Volume
    // -----------------------------

    const handleVolumeChange = (e) => {

        const vol = parseFloat(e.target.value);

        setVolume(vol);

        if (audioRef.current) {
            audioRef.current.volume = vol;
        }

        if (vol > 0) {

            setPreviousVolume(vol);
            setIsMuted(false);

        } else {

            setIsMuted(true);
        }
    };

    // -----------------------------
    // Mute / Unmute
    // -----------------------------

    const toggleMute = () => {

        if (!audioRef.current) {
            return;
        }

        if (isMuted) {

            const restoredVolume =
                previousVolume > 0
                    ? previousVolume
                    : 0.5;

            audioRef.current.volume =
                restoredVolume;

            setVolume(restoredVolume);

            setIsMuted(false);

        } else {

            if (volume > 0) {
                setPreviousVolume(volume);
            }

            audioRef.current.volume = 0;

            setVolume(0);

            setIsMuted(true);
        }
    };

    // -----------------------------
    // Next Song
    // -----------------------------

    const nextSong = async () => {

        if (!track || !audioRef.current) {
            return;
        }

        const currentIndex =
            songsData.findIndex(
                (item) => item._id === track._id
            );

        if (
            currentIndex === -1 ||
            currentIndex >= songsData.length - 1
        ) {

            setPlayStatus(false);

            return;
        }

        const nextTrack =
            songsData[currentIndex + 1];

        setTrack(nextTrack);

        audioRef.current.src =
            nextTrack.file;

        audioRef.current.load();

        try {

            await audioRef.current.play();

            setPlayStatus(true);

        } catch (error) {

            console.error(
                "Failed to play next song:",
                error
            );

            setPlayStatus(false);
        }
    };

    // -----------------------------
    // Audio Event Handling
    // -----------------------------

    useEffect(() => {

        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const updateTime = () => {

            const currentTime =
                audio.currentTime || 0;

            const duration =
                audio.duration || 0;

            setTime({
                currentTime: {
                    second: Math.floor(
                        currentTime % 60
                    ),
                    minute: Math.floor(
                        currentTime / 60
                    )
                },

                totalTime: {
                    second: Math.floor(
                        duration % 60
                    ),
                    minute: Math.floor(
                        duration / 60
                    )
                }
            });

            if (
                seekBar.current &&
                duration > 0
            ) {

                const progress =
                    (currentTime / duration) * 100;

                seekBar.current.style.width =
                    `${progress}%`;
            }
        };

        const handleLoadedMetadata = () => {
            updateTime();
        };

        const handlePlay = () => {
            setPlayStatus(true);
        };

        const handlePause = () => {
            setPlayStatus(false);
        };

        const handleEnded = () => {
            nextSong();
        };

        audio.addEventListener(
            "timeupdate",
            updateTime
        );

        audio.addEventListener(
            "loadedmetadata",
            handleLoadedMetadata
        );

        audio.addEventListener(
            "play",
            handlePlay
        );

        audio.addEventListener(
            "pause",
            handlePause
        );

        audio.addEventListener(
            "ended",
            handleEnded
        );

        return () => {

            audio.removeEventListener(
                "timeupdate",
                updateTime
            );

            audio.removeEventListener(
                "loadedmetadata",
                handleLoadedMetadata
            );

            audio.removeEventListener(
                "play",
                handlePlay
            );

            audio.removeEventListener(
                "pause",
                handlePause
            );

            audio.removeEventListener(
                "ended",
                handleEnded
            );
        };

    }, [track, songsData]);

    // -----------------------------
    // Play
    // -----------------------------

    const play = async () => {

        if (!audioRef.current) {
            return;
        }

        try {

            await audioRef.current.play();

            setPlayStatus(true);

        } catch (error) {

            console.error(
                "Failed to play audio:",
                error
            );

            setPlayStatus(false);
        }
    };

    // -----------------------------
    // Pause
    // -----------------------------

    const pause = () => {

        if (!audioRef.current) {
            return;
        }

        audioRef.current.pause();

        setPlayStatus(false);
    };

    // -----------------------------
    // Loop
    // -----------------------------

    const toggleLoop = () => {
        setIsLooping((previous) => !previous);
    };

    useEffect(() => {

        if (audioRef.current) {
            audioRef.current.loop = isLooping;
        }

    }, [isLooping]);

    // -----------------------------
    // Shuffle
    // -----------------------------

    const toggleShuffle = () => {
        setIsShuffle((previous) => !previous);
    };

    const shuffleSongs = (songs) => {

        const shuffledSongs = [...songs];

        for (
            let i = shuffledSongs.length - 1;
            i > 0;
            i--
        ) {

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [
                shuffledSongs[i],
                shuffledSongs[j]
            ] = [
                shuffledSongs[j],
                shuffledSongs[i]
            ];
        }

        return shuffledSongs;
    };

    useEffect(() => {

        if (originalSongsData.length === 0) {
            return;
        }

        if (isShuffle) {

            setSongsData(
                shuffleSongs(originalSongsData)
            );

        } else {

            setSongsData(originalSongsData);
        }

    }, [isShuffle, originalSongsData]);

    // -----------------------------
    // Play Song By ID
    // -----------------------------

    const playWithId = async (id) => {

        const selectedSong =
            songsData.find(
                (item) => item._id === id
            );

        if (
            !selectedSong ||
            !audioRef.current
        ) {
            return;
        }

        setTrack(selectedSong);

        audioRef.current.src =
            selectedSong.file;

        audioRef.current.load();

        try {

            await audioRef.current.play();

            setPlayStatus(true);

        } catch (error) {

            console.error(
                "Failed to play song:",
                error
            );

            setPlayStatus(false);
        }
    };

    // -----------------------------
    // Previous Song
    // -----------------------------

    const previusSong = async () => {

        if (!track || !audioRef.current) {
            return;
        }

        const currentIndex =
            songsData.findIndex(
                (item) => item._id === track._id
            );

        if (currentIndex <= 0) {
            return;
        }

        const previousTrack =
            songsData[currentIndex - 1];

        setTrack(previousTrack);

        audioRef.current.src =
            previousTrack.file;

        audioRef.current.load();

        try {

            await audioRef.current.play();

            setPlayStatus(true);

        } catch (error) {

            console.error(
                "Failed to play previous song:",
                error
            );

            setPlayStatus(false);
        }
    };

    // -----------------------------
    // Seek Song
    // -----------------------------

    const seekSong = (e) => {

        if (
            !audioRef.current ||
            !seekBg.current ||
            !audioRef.current.duration
        ) {
            return;
        }

        const clickPosition =
            e.nativeEvent.offsetX;

        const seekWidth =
            seekBg.current.offsetWidth;

        audioRef.current.currentTime =
            (
                clickPosition /
                seekWidth
            ) *
            audioRef.current.duration;
    };

    // -----------------------------
    // Get Songs
    // -----------------------------

    const getSongsData = async () => {

        try {

const response = await api.get("/api/song/list");

            const songs =
                response.data.songs || [];

            setSongsData(songs);

            setOriginalSongsData(songs);

            if (songs.length > 0) {
                setTrack(songs[0]);
            }

        } catch (error) {

            console.error(
                "Failed to get songs:",
                error
            );

            if (error.code === "ECONNABORTED") {

                setApiError(
                    "The server is taking too long to respond."
                );

            } else if (error.response) {

                setApiError(
                    `Server error: ${error.response.status}`
                );

            } else {

                setApiError(
                    "Unable to connect to the backend server."
                );
            }
        }
    };

    // -----------------------------
    // Get Albums
    // -----------------------------

    const getAlbumsData = async () => {

        try {

            const response = await api.get("/api/album/list");

            setAlbumsData(
                response.data.albums || []
            );

        } catch (error) {

            console.error(
                "Failed to get albums:",
                error
            );

            if (!apiError) {

                if (
                    error.code === "ECONNABORTED"
                ) {

                    setApiError(
                        "The server is taking too long to respond."
                    );

                } else if (error.response) {

                    setApiError(
                        `Server error: ${error.response.status}`
                    );

                } else {

                    setApiError(
                        "Unable to connect to the backend server."
                    );
                }
            }
        }
    };

    // -----------------------------
    // Initial Data Loading
    // -----------------------------

    useEffect(() => {

        const loadData = async () => {

            setIsLoading(true);
            setApiError("");

            await Promise.all([
                getAlbumsData(),
                getSongsData()
            ]);

            setIsLoading(false);
        };

        loadData();

    }, []);

    // -----------------------------
    // Context Value
    // -----------------------------

    const contextValue = {

        audioRef,
        seekBar,
        seekBg,

        track,
        setTrack,

        playStatus,
        setPlayStatus,

        time,
        setTime,

        isLoading,
        apiError,

        play,
        pause,

        playWithId,

        previusSong,
        nextSong,

        seekSong,

        songsData,
        albumsData,

        isLooping,
        toggleLoop,

        isShuffle,
        toggleShuffle,

        volume,
        handleVolumeChange,

        isMuted,
        toggleMute
    };

    return (
        <PlayerContext.Provider
            value={contextValue}
        >
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;