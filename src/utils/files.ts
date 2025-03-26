import fs from "fs";
import path from "path";

export function deleteOldPicture(oldPictureUrl: string, pictureType: string): void {
  const oldFileName = oldPictureUrl.split("/").pop();
  const oldFilePath = path.join(__dirname, `../../uploads/${pictureType}`, oldFileName!);
  fs.existsSync(oldFilePath) && fs.unlinkSync(oldFilePath);
}

export function deleteOldPictures(oldPictures: string[], pictureType: string): void {
  oldPictures.forEach((pictureUrl) => {
    const fileName = pictureUrl.split("/").pop();
    const filePath = path.join(__dirname, `../../uploads/${pictureType}`, fileName!);
    fs.existsSync(filePath) && fs.unlinkSync(filePath);
  });
}
