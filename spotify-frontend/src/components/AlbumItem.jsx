import { useNavigate } from "react-router-dom";
import { assets } from "../assets/frontend-assets/assets";

function AlbumItem({ image, name, desc, id }) {
    const navigate = useNavigate();

    return (
        <button
            type="button"
            onClick={() => navigate(`/album/${id}`)}
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
            aria-label={`Open album ${name}`}
        >
            <img
                className="rounded w-full aspect-square object-cover"
                src={image}
                alt={`${name} album cover`}
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

export default AlbumItem;