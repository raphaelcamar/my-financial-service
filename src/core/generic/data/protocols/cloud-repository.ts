export interface CloudServiceRepository {
  bucketS3(filename: string, key: string): Promise<string>
}
