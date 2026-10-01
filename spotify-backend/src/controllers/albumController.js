import { v2 as cloudinary } from "cloudinary";
import Album from "../models/Album.js";
import Song from "../models/Song.js";

const addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColour } = req.body;
        const imageFile = req.file;

        if (!name?.trim() || !desc?.trim() || !bgColour?.trim()) {
            return res.status(400).json({
                success: false,
                message:
                    "Album name, description and background colour are required",
            });
        }

        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: "Album image is required",
            });
        }

        const imageUpload = await cloudinary.uploader.upload(
            imageFile.path,
            {
                resource_type: "image",
            }
        );

        const albumData = {
            name: name.trim(),
            desc: desc.trim(),
            bgColour: bgColour.trim(),
            image: imageUpload.secure_url,
            imagePublicId: imageUpload.public_id,
        };

        const album = new Album(albumData);
        await album.save();

        res.status(201).json({
            success: true,
            message: "Album Added",
        });
    } catch (error) {
        console.error("Failed at addAlbum:", error);

        res.status(500).json({
            success: false,
            message: "Album Add Failed",
        });
    }
};

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await Album.find({});

        res.status(200).json({
            success: true,
            albums: allAlbums,
        });
    } catch (error) {
        console.error("Failed at listAlbum:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch albums",
        });
    }
};

const removeAlbum = async (req, res) => {
    try {
        const { id } = req.params;

        const album = await Album.findById(id);

        if (!album) {
            return res.status(404).json({
                success: false,
                message: "Album not found",
            });
        }

        const albumSongs = await Song.find({
            album: album.name,
        });

        for (const song of albumSongs) {
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
        }

        if (album.imagePublicId) {
            await cloudinary.uploader.destroy(album.imagePublicId, {
                resource_type: "image",
            });
        }

        await Song.deleteMany({
            album: album.name,
        });

        await Album.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Album removed successfully",
        });
    } catch (error) {
        console.error("Failed at removeAlbum:", error);

        res.status(500).json({
            success: false,
            message: "Failed to remove album",
        });
    }
};

export { addAlbum, listAlbum, removeAlbum };