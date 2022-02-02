/*tipo para representar as 
Tansações que serão salvas no extrato bancário*/

export type Transaction = {
    value: number,
    date: Date,
    description: string
}

//tipo para representar uma conta para o usuário
export type Account = {
   name: string,
   CPF: string,
   dateOfBirth: Date,
   balance: number,
   statement: Array<Transaction> 
}