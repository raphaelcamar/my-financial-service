import { UseCase } from "@core/generic/data/protocols"

export class CreateHistory implements UseCase<void> {
  execute: () => Promise<void>
}
