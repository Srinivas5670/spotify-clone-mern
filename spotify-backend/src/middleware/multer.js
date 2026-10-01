import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname);

        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${extension}`;

        callback(null, uniqueName);
    },
});

const fileFilter = (req, file, callback) => {
    if (file.fieldname === "image") {
        if (file.mimetype.startsWith("image/")) {
            callback(null, true);
        } else {
            callback(new Error("Only image files are allowed"));
        }
    } else if (file.fieldname === "audio") {
        if (file.mimetype.startsWith("audio/")) {
            callback(null, true);
        } else {
            callback(new Error("Only audio files are allowed"));
        }
    } else {
        callback(new Error("Unexpected file field"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
});

export default upload;