import express from 'express'
import { getUsers, addUser, upUser, deleteUser } from '../controllers/user.js'

const router = express.Router()

router.get("/", getUsers)

router.post("/", addUser)

router.put("/:id", upUser)

router.delete("/:id", deleteUser)


export default router