import { Tag } from "@tag/domain/entities"

export interface TagRepository {
  create(tag: Tag.Data): Promise<Tag>
  inactivate(tagId: string, inactivatedAt: Date): Promise<Tag>
  delete(tagId: string, userId: string): Promise<Tag>
}
