import { check } from "express-validator"

export const loginValidator = [
  check("id")
    .isString()
    .isLength({ min: 4 }),
  check("pw")
    .isString()
    .isLength({ min: 4 })
]
