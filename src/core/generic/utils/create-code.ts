export const createCode = (max: number, min: number): number =>
  Math.floor(Math.random() * (max - min) + min)
