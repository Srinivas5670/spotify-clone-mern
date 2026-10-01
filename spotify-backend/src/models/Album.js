import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
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
    bgColour: {
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
});

const Album =
    mongoose.models.album || mongoose.model("album", albumSchema);

export default Album;