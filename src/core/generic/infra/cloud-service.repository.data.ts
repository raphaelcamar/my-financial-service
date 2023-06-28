import { CloudServiceRepository } from "@core/generic/data/protocols"
import { CreateLocalFileError } from "@core/generic/domain/errors"
import { S3 } from "@aws-sdk/client-s3"
import mime from "mime"
import path from "path"
import fs from "fs"

export class CloudServiceRepositoryData implements CloudServiceRepository {
  private s3Client: S3

  constructor() {
    this.s3Client = new S3({ region: process.env.REGION })
  }

  async bucketS3(filename: string, userId: string): Promise<string> {
    const originalPath = path.resolve(__dirname, "..", "..", "tmp", filename)
    const ContentType = mime.getType(originalPath)

    if (!ContentType) throw new CreateLocalFileError("Não foi possível atualizar a foto.")

    const fileContent = await fs.promises.readFile(originalPath)

    await fs.promises.unlink(originalPath)

    await this.s3Client.putObject({
      Bucket: process.env.BUCKET_NAME,
      Body: fileContent,
      Key: userId,
      ContentType,
    })

    return `${process.env.BUCKET_URL}/${userId}`
  }
}
