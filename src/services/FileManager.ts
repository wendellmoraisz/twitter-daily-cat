const request = require("request");
const fs = require("fs");

class FileManager {
  public async downloadAndSaveImage(
    imgURL: string,
    destinyPath: string,
    callback?: () => void
  ) {
    try {
      request.head(imgURL, () => {
        request(imgURL).pipe(fs.createWriteStream(destinyPath)).on("close", callback);
      });
    } catch (error) {}
  }
}

export default FileManager;
