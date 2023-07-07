import { Tag } from "@user/domain/entities"

export type TagProtocol = {
  create: (tag: Tag, userId: string) => Promise<Tag>
}
