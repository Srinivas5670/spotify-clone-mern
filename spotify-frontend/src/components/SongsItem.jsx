import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

function SongsItem({ image, name, desc, id }) {
    const { playWithId } = useContext(PlayerContext);

    return (
        <div
            onClick={() => playWithId(id)}
            className="w-full p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] overflow-hidden"
        >
            <img
                className="w-full aspect-square object-cover rounded"
                src={image}
                alt="album img"
            />

            <p className="font-bold mt-2 mb-1 truncate">
                {name}
            </p>

            <p className="text-slate-200 text-sm truncate">
                {desc}
            </p>
        </div>
    );
}

export default SongsItem;