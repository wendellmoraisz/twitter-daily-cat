import fs from "fs";
import request from "request";

class FileManager {
  public async downloadAndSaveImage(imgURL: string, destinyPath: string): Promise<void> {
    const stream = request.get(imgURL);
    const fileStream = fs.createWriteStream(destinyPath);

    return new Promise((resolve, reject) => {
      stream.on("error", (err) => {
        fileStream.close();
        reject(err);
      });

      fileStream.on("finish", () => {
        resolve();
      });

      stream.pipe(fileStream);
    });
  }
}

export default FileManager;
