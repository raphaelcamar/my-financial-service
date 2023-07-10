import { Pagination } from "@core/generic/data/protocols"
import { UnexpectedError } from "@core/generic/domain/errors"
import { TagProtocol } from "@user/data/protocols"
import { Tag } from "@user/domain/entities"
import { Tag as TagSchema } from "@user/infra/db/schemas"

const PAGE_SIZE = 5

export class TagRepositoryData implements TagProtocol {
  async create(tag: Tag): Promise<Tag> {
    const tagSchema = new TagSchema({ ...tag })

    const createdTag: any = await tagSchema.save({ safe: true, checkKeys: true }).catch(() => {
      throw new UnexpectedError()
    })

    return new Tag(createdTag)
  }

  async get(page: number, userId: string): Promise<Pagination<Tag, "tags">> {
    const result: any = await TagSchema.aggregate([
      {
        $group: {
          _id: userId,
          tags: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $project: {
          items: {
            $slice: ["$tags", (page - 1) * PAGE_SIZE, PAGE_SIZE],
          },
          total_count: {
            $size: "$tags",
          },
        },
      },
    ])

    const { total_count, items } = result[0]

    const totalPages = Math.ceil(total_count / PAGE_SIZE)

    return { pageSize: PAGE_SIZE, tags: items, totalPages, currentPage: page }
  }
}
