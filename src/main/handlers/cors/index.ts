import middlewareCors from "cors"

export type Methods = "GET" | "PUT" | "POST" | "DELETE"

export type Cors = {
  origin: string
  methods?: Methods
  optionsSuccessStatus?: number
}

export const cors = (options: Cors): any => middlewareCors(options)
