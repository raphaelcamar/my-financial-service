import { Pagination } from "@core/generic/data/protocols"
import { Tag } from "@user/domain/entities"

export type TagProtocol = {
  create: (tag: Tag) => Promise<Tag>
  get: (page: number, userId: string) => Promise<Pagination<Tag, "tags">>
}
