import Multer from "multer"
import path from "path"
import crypto from "crypto"

export class HandleFileRequest {
  multer: Multer.Multer

  constructor() {
    this.multer = Multer({
      dest: path.resolve(__dirname, "..", "..", "..", "tmp"),
      storage: Multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "..", "tmp"),
        filename(request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString("hex")

          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        },
      }),
    })
  }
}