import { TagRoutes } from "@tag/presenters/routes/tag.route"
import { App } from "@main/handlers"
import { MonthlyCloseRoutes, TransactionRoutes } from "@transaction/presenters/routes"
import { TransactionV2Routes, UserRoutes, WalletRoutes, TagRoutes as TagV2Routes } from "@user/presenters/routes"
import { MonthlyClosingRoutes } from "@user/presenters/routes/monthly-closing.route"
import { MonthlyRecurrenceRoutes } from "@user/presenters/routes/monthly-recurrence.route"

export class InitializeRoutes {
  constructor(private app: App) {}

  initialize(): void {
    UserRoutes(this.app)

    WalletRoutes(this.app)

    TransactionRoutes(this.app)

    MonthlyCloseRoutes(this.app)

    TagRoutes(this.app)

    TransactionV2Routes(this.app)

    MonthlyClosingRoutes(this.app)

    TagV2Routes(this.app)

    MonthlyRecurrenceRoutes(this.app)

    this.getSingularRoutes()
  }

  getSingularRoutes() {
    this.app.get("/", (req, res) => {
      res.status(200).json({ message: "Hello!" })
    })
  }
}
