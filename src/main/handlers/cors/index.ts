import middlewareCors from "cors"

export type Methods = "GET" | "PUT" | "POST" | "DELETE"

export type Cors = middlewareCors.CorsOptions & {}

export const cors = (options: Cors): any => middlewareCors(options)
