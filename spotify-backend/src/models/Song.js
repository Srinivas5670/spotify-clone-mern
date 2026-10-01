import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
        trim: true,
    },
    album: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    imagePublicId: {
        type: String,
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    audioPublicId: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
});

const Song =
    mongoose.models.song || mongoose.model("song", songSchema);

export default Song;