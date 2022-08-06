import { App, parseRequest, urlEncoded, cors } from "@main/handlers"

export class InitializeMiddlewares {
  constructor(private app: App, private listenPort: number) {}

  initialize(): void {
    this.app.listen(this.listenPort, () =>
      console.log(`Server is Running at http://localhost:${this.listenPort}/`)
    )
    this.app.use(parseRequest({}))

    this.app.use(urlEncoded({ extended: true }))

    this.app.use(
      cors({
        origin: ["https://my-financial-front.vercel.app", "http://localhost:3000"],
        optionsSuccessStatus: 200,
      })
    )
  }
}
