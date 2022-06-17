import { EmailServiceData } from "@core/generic/domain/entities"

export interface EmailServiceRepository {
  send(data: EmailServiceData): Promise<void>
}
