import express from "express";
import { getUsers, signup, signin } from "../controllers/auth.js";
import role from '../middleware/role.js'
import { validator } from "../middleware/validator.js"

const auth = express.Router()

auth.get('/users', role(['ADMIN']), getUsers)
auth.post('/signup', validator, signup)
auth.post('/signin', signin)

export default auth