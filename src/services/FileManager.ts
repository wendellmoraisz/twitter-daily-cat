const request = require("request");
const fs = require("fs");

class FileManager {
  public downloadAndSaveImage(
    imgURL: string,
    destinyPath: string,
    callback?: () => void
  ): void {
    request.head(imgURL, () => {
      request(imgURL)
        .pipe(fs.createWriteStream(destinyPath))
        .on("close", callback);
    });
  }
}

export default FileManager;
