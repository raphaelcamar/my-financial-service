type GetPropertyKey<T, K extends string> = {
  [P in K]: T
}

export type Pagination<T, K extends string> = GetPropertyKey<T, K> & {
  currentPage: number
  totalPages: number
  pageSize: number
}
