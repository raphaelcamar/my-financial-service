import { TagRoutes } from "@tag/presenters/routes/tag.route"
import { App } from "@main/handlers"
import { MonthlyCloseRoutes, TransactionRoutes } from "@transaction/presenters/routes"
import { TransactionV2Routes, UserRoutes, WalletRoutes } from "@user/presenters/routes"

export class InitializeRoutes {
  constructor(private app: App) {}

  initialize(): void {
    UserRoutes(this.app)

    WalletRoutes(this.app)

    TransactionRoutes(this.app)

    MonthlyCloseRoutes(this.app)

    TagRoutes(this.app)

    TransactionV2Routes(this.app)

    this.getSingularRoutes()
  }

  getSingularRoutes() {
    this.app.get("/", (req, res) => {
      res.status(200).json({ message: "Hello!" })
    })
  }
}
