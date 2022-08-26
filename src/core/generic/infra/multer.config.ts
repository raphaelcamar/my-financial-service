import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'temp')

export const multerConfig = () => ({
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString('hex')

      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
})