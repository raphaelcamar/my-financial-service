import { App } from "@main/handlers"
import { MonthlyCloseRoutes, TransactionRoutes } from "@transaction/presenters/routes"
import { UserRoutes } from "@user/presenters/routes"

export class InitializeRoutes {
  constructor(private app: App) {}

  initialize(): void {
    UserRoutes(this.app)

    TransactionRoutes(this.app)

    MonthlyCloseRoutes(this.app)

    this.getSingularRoutes()
  }

  getSingularRoutes() {
    this.app.get("/", (req, res) => {
      res.status(200).json({ message: "Hello!" })
    })
  }
}
