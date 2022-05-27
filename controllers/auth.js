import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'

import User from "../models/User.js"
import Role from "../models/Role.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()

        return res.json(users)

    } catch (err) {

    }

}

export const signup = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'ошибка при регистрации', errors: errors.array() });
        }

        const { login, password } = req.body

        const candidate = await User.findOne({ login })
        if (candidate) return res.status(400).json({ message: 'пользователь уже существует' })

        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await Role.findOne({ value: 'USER' })

        const user = await User.create({
            login,
            password: hashPassword,
            roles: [userRole.value]
        })

        return res.json({ message: 'пользователь успешно создан' })

    } catch (err) {

    }

}

export const signin = async (req, res) => {
    try {
        const { login, password } = req.body

        const candidate = await User.findOne({ login })
        if (!candidate) return res.status(400).json({ message: 'неверный логин' })

        const checkPassword = await bcrypt.compare(password, candidate.password)
        if (!checkPassword) return res.status(400).json({ message: 'неверный пароль' })

        const payload = {
            id: candidate._id,
            roles: candidate.roles,
        }
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' })

        return res.json({ message: 'успешный вход', token })

    } catch (err) {

    }
}