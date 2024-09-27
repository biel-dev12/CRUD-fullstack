import { db } from '../db.js'

export const getUsers = (_, res) => {
  const q = "SELECT * FROM usuarios"

  db.query(q, (err, data) => {
    if(err) return res.json(err)

    return res.status(200).json(data)
  })
}

export const addUser = (req, res) => {
  const q = "INSERT INTO usuarios(`nome`, `email`, `fone`, `data_nasc`) VALUES(?)"

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nasc,
  ]

  db.query(q, [values], (err) => {
    if (err) return res.json(err)

      return res.status(200).json("usuário criado com sucesso")
  })
}

export const upUser = (req, res) => {
  const q = "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nasc` = ? WHERE `id` = ?"

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nasc,
  ]

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err)

      return res.status(200).json("usuário arualizado com sucesso")
  })
}

export const deleteUser = (req, res) => {
  const q = "DELETE FROM usuarios WHERE `id` = ?"

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err)

      return res.status(200).json("usuário deletado com sucesso")
  })
}