import { CloudServiceRepository, UseCase } from "@core/generic/data/protocols"
import { UserRepository } from "@user/data/protocols"

export class UpdatePicture implements UseCase<string> {
  constructor(
    private userRepository: UserRepository,
    private cloudServiceRepository: CloudServiceRepository,
    private filename: string,
    private userId: string
  ) {}

  async execute(): Promise<string> {
    const url = await this.cloudServiceRepository.bucketS3(this.filename, this.userId)
    await this.userRepository.updatePicture(url, this.userId)

    return url
  }
}
