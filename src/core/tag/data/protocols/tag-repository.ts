import { Tag } from "@core/tag/domain/entities"

export interface TagRepository {
  create(tag: Tag.Data): Promise<Tag>
}
