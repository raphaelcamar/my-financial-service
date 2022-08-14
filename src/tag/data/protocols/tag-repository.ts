import { Tag } from "@tag/domain/entities"

export interface TagRepository {
  create(tag: Tag.Data): Promise<Tag>
}
