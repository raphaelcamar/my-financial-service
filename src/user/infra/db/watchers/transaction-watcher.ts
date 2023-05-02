/* eslint-disable func-names */
import mongoose from "mongoose"
import { UnexpectedError } from "@core/generic/domain/errors"
import { Wallet } from "../schemas"

export async function updateWalletBeforeAddTransaction(next: mongoose.CallbackWithoutResultAndOptionalError) {
  try {
    const transaction = this
    const wallet = await Wallet.findById(transaction.walletId)
    let walletValue = wallet.value as number

    if (transaction.type === "SPENT") {
      walletValue -= transaction.value
    } else {
      walletValue += transaction.value
    }
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

    const walletValue = wallet?.value as number

    wallet.value = transaction?.type === "SPENT" ? walletValue - (transaction.value as number) : walletValue + (transaction.value as number)

    await Wallet.updateOne({ _id: wallet.id }, wallet)
    next()
  } catch (err) {
    throw new UnexpectedError(err)
  }
}

export async function updateWalletBeforeDeleteTransaction(next: mongoose.CallbackWithoutResultAndOptionalError) {
  try {
    const transaction = this
    const wallet = await Wallet.findById(transaction.walletId)

    const walletValue = wallet?.value as number

    wallet.value = transaction?.type === "SPENT" ? walletValue + (transaction.value as number) : walletValue - (transaction.value as number)

    await Wallet.updateOne({ _id: wallet.id }, wallet)

    next()
  } catch (err) {
    throw new UnexpectedError(err)
  }
}
