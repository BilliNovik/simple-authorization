import { check } from 'express-validator'

export const validator = [
    check('login', 'имя не может быть пустым').notEmpty(),
    check('login', 'имя не может быть меньше 3 символов').isLength({ min: 3 }),
    check('login', 'имя не может быть больше 30 символов').isLength({ max: 30 }),
    check('password', 'пароль не может быть пустым').notEmpty(),
    check('password', 'пароль должен быть больше 4 и меньше 20 символов').isLength({ min: 4, max: 20 })
]