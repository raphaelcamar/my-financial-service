export interface Builder<T> {
  data: T
  build: () => T
}
