import { Pagination } from "@core/generic/data/protocols"
import { Tag } from "@user/domain/entities"

export type TagProtocol = {
  create: (tag: Tag) => Promise<Tag>
  get: (page: number, userId: string) => Promise<Pagination<Tag, "tags">>
  update: (tag: Tag) => Promise<Tag>
  // TODO create monthly recurrence before
  getLinkedTags?: (tagId: string) => Promise<Tag[]>
  getById: (tagId: string) => Promise<Tag>
}
