// import multer from "multer"

// let storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"./public")
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })
// const upload = multer({storage})

// export default upload

import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public");
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

export default upload;
