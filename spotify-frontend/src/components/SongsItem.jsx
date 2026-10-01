import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

function SongsItem({ image, name, desc, id }) {
    const { playWithId } = useContext(PlayerContext);

    return (
        <button
            type="button"
            onClick={() => playWithId(id)}
            className="
                min-w-[180px]
                p-2
                px-3
                rounded
                text-left
                cursor-pointer
                hover:bg-[#ffffff26]
                focus:outline-none
                focus:ring-2
                focus:ring-white
                transition
            "
            aria-label={`Play ${name}`}
        >
            <img
                className="rounded w-full aspect-square object-cover"
                src={image}
                alt={`${name} cover`}
            />

            <p className="font-bold mt-2 mb-1 truncate">
                {name}
            </p>

            <p className="text-slate-200 text-sm line-clamp-2">
                {desc}
            </p>
        </button>
    );
}

export default SongsItem;