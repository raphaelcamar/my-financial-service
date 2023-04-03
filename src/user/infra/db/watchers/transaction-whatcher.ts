/* eslint-disable func-names */
import mongoose from "mongoose"
import { UnexpectedError } from "@core/generic/domain/errors"
import { Transaction, Wallet } from "../schemas"

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

export async function updateWalletBeforeUpdateTransaction(next: mongoose.CallbackWithoutResultAndOptionalError) {
  try {
    const transaction = this._update
    const wallet = await Wallet.findById(transaction.walletId)
    const transactionToUpdate = await Transaction.findById(transaction._id, { value: 1 })

    const walletValue = wallet.value as number
    wallet.value = walletValue - (transactionToUpdate.value as number) + (transaction.value as number)

    await Wallet.updateOne({ _id: wallet.id }, wallet)
    next()
  } catch (err) {
    throw new UnexpectedError(err)
  }
}
