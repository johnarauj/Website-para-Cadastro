import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()


const app = express();
app.use(express.json())
app.use(cors())


app.post('/usuarios', async (req , res) =>{
    
    await prisma.user.create({
        data:{
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

const users= []

app.get('/usuarios', async (req, res) =>{

    const users = await prisma.user.findMany()

    res.status(200).json(users)
});

app.put('/usuarios/:id', async (req , res) =>{
    
    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data:{
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req , res) =>{
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: "Usuário deletado com sucesso!!"})
})

app.listen(3000)

/*
    1) Tipo de rota / Metodo HTTP
    2) Endereço


    Criar nossa API de usuario
    --Criar um usuario
    --Listar todos os usuarios

    jonnathan
    QWUllyCJjCegpKqx
*/ 