/* eslint-disable no-shadow */

export enum SocketPayloadType {
  CREATE_MONTHLY_RECURRENCE = "CREATE_MONTHLY_RECURRENCE",
  MONTHLY_RECURRENCE_EMITTED = "MONTHLY_RECURRENCE_EMITTED",
  MONTHLY_RECURRENCE_ERROR = "MONTHLY_RECURRENCE_ERROR",
}

export enum SocketCommunicationType {
  NOTIFICATION = "NOTIFICATION",
}
