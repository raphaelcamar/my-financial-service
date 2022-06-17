export type Attachment = {
  fileName?: string
  content?: any
  path?: string
}

export type EmailServiceData = {
  to: string
  subject: string
  text: string
  html?: string
  attachment?: Attachment[]
}
