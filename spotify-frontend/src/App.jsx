import { useContext } from "react";
import Display from "./components/Display";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
    const {
        audioRef,
        track,
        songsData,
        isLoading,
        apiError,
    } = useContext(PlayerContext);

    if (isLoading) {
        return (
            <div className="h-screen bg-black text-white flex items-center justify-center">
                <p>Loading songs...</p>
            </div>
        );
    }

    if (apiError && songsData.length === 0) {
        return (
            <div className="h-screen bg-black text-white flex items-center justify-center px-6 text-center">
                <div>
                    <h1 className="text-xl font-semibold mb-2">
                        Unable to load Spotify Clone
                    </h1>
                    <p className="text-gray-400">
                        {apiError}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen bg-black">
            <div className="h-[90%] flex">
                <Sidebar />
                <Display />
            </div>

            <Player />

            <audio
                ref={audioRef}
                src={track?.file || ""}
                preload="none"
            />
        </div>
    );
};

export default App;