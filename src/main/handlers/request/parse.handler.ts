import { json, urlencoded } from "express"

export const parseRequest = (bodyOptions: {}): any => json(bodyOptions)

export const urlEncoded = (bodyOptions: {}): any => urlencoded(bodyOptions)
