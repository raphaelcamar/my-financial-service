/* eslint-disable func-names */
import mongoose from "mongoose"
import { UnexpectedError } from "@core/generic/domain/errors"
import { Wallet } from "../schemas"

export async function updateWalletBeforeAddTransaction(next: mongoose.CallbackWithoutResultAndOptionalError) {
  try {
    const transaction = this
    const wallet = await Wallet.findById(transaction.walletId)

    let walletValue = wallet.value as number
    walletValue += transaction.value
    wallet.value = walletValue

    await Wallet.updateOne({ _id: wallet.id }, wallet)
    next()
  } catch (err) {
    throw new UnexpectedError(err)
  }
}
