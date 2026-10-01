import { v2 as cloudinary } from "cloudinary";
import Song from "../models/Song.js";

const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;

        const audioFile = req.files?.audio?.[0];
        const imageFile = req.files?.image?.[0];

        if (!name?.trim() || !desc?.trim() || !album?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Song name, description and album are required",
            });
        }

        if (!audioFile || !imageFile) {
            return res.status(400).json({
                success: false,
                message: "Song audio and image are required",
            });
        }

        const [audioUpload, imageUpload] = await Promise.all([
            cloudinary.uploader.upload(audioFile.path, {
                resource_type: "video",
            }),
            cloudinary.uploader.upload(imageFile.path, {
                resource_type: "image",
            }),
        ]);

        const duration = `${Math.floor(
            audioUpload.duration / 60
        )}:${String(Math.floor(audioUpload.duration % 60)).padStart(2, "0")}`;

        const songData = {
            name: name.trim(),
            desc: desc.trim(),
            album: album.trim(),
            image: imageUpload.secure_url,
            imagePublicId: imageUpload.public_id,
            file: audioUpload.secure_url,
            audioPublicId: audioUpload.public_id,
            duration,
        };

        const song = new Song(songData);
        await song.save();

        res.status(201).json({
            success: true,
            message: "Song Added",
        });
    } catch (error) {
        console.error("Failed at addSong:", error);

        res.status(500).json({
            success: false,
            message: "Song Add Failed",
        });
    }
};

const listSong = async (req, res) => {
    try {
        const allSongs = await Song.find({});

        res.status(200).json({
            success: true,
            songs: allSongs,
        });
    } catch (error) {
        console.error("Failed at listSong:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch songs",
        });
    }
};

const removeSong = async (req, res) => {
    try {
        const { id } = req.params;

        const song = await Song.findById(id);

        if (!song) {
            return res.status(404).json({
                success: false,
                message: "Song not found",
            });
        }

        if (song.imagePublicId) {
            await cloudinary.uploader.destroy(song.imagePublicId, {
                resource_type: "image",
            });
        }

        if (song.audioPublicId) {
            await cloudinary.uploader.destroy(song.audioPublicId, {
                resource_type: "video",
            });
        }

        await Song.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Song removed successfully",
        });
    } catch (error) {
        console.error("Failed at removeSong:", error);

        res.status(500).json({
            success: false,
            message: "Failed to remove song",
        });
    }
};

export { addSong, listSong, removeSong };