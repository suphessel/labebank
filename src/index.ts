import express, {Express, Request, Response} from 'express'
import cors from "cors"
import { accounts } from './accounts';


const app: Express = express();

app.use(express.json());
app.use(cors());

app.post("/users/create", (req: Request, res: Response) => {
    try {
        const {name, CPF, dateOfBirthAsString} = req.body

        const [day, month, year] = dateOfBirthAsString.split("/")

        const dateOfBirth: Date = new Date(`${year}-${month}-${day}`)
        //validar as entradas da req

        /*forma de pegar o timestamp(data do momento da execução do código): 
        new Date().getTime() ou Date.now().
        */
        const ageInMilisseconds: number = Date.now() - dateOfBirth.getTime()

        const ageInYears: number = ageInMilisseconds / 1000 / 60 / 60 / 24 / 365

        if(ageInYears < 18){
            res.statusCode = 406
            throw new Error("Idade deve ser maior que 18 anos")
        }

        //consultar ou alterar a base de dados
        
        accounts.push({
            name, 
            CPF,
            dateOfBirth,
            balance: 0,
            statement: []
        })
        //validar os resultados da consulta (não precisou fazer)
        //enviar a resposta

        res.status(201).send("Conta criada com sucesso")

    }catch (error){
        console.log(error)
        res.send(error.message)

    }
})

/*crie um método GET na entidade users que será responsável por pegar 
todos os usuários existentes no array de usuários */

app.get("/users/all", (req: Request, res: Response) => {

try{

if(!accounts.length){
    res.statusCode = 404
    throw new Error("Nenhuma conta encontrada")
}
res.status(200).send(accounts)

}catch (error){
    console.log(error)
    res.send(error.message)
}
})


// console.log("oiii")

app.listen(3003, () => {
    console.log("Server is running at http://localhost:3003")
})