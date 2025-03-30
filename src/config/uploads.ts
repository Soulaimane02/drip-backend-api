import { Request } from "express";
import multer from "multer";
import path from "path";

const getStorage = (filepath: string): multer.StorageEngine => {
  return multer.diskStorage({
    destination: (req: Request, file, cb) => {
      cb(null, path.join(__dirname, filepath));
    },
    filename: (req: Request, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
};

export const uploadUserConfig = multer({ storage: getStorage("../../uploads/profile-pictures") }).single("profilePicture");
export const uploadArticleConfig = multer({ storage: getStorage("../../uploads/article-pictures") }).array("pictures", 5);
export const uploadMessageConfig = multer({ storage: getStorage("../../uploads/message-pictures") }).array("pictures", 5);
