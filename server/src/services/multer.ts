import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"uploads/");
    },
    filename: (req,file,cb) => {
        cb(null, `${file.originalname}`)
    }
})
export const upload = multer({ storage, fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp') {
        return cb(new Error('Only images are allowed'));
      }
      cb(null, true);
}, });