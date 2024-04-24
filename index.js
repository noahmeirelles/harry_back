const express = require('express');
const {Pool} = require('pg');
const app = express();
const port = 4000

app.use(express.json())
const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database: "harryback",
    password: "ds564",
    port: 7007
});

//GET
app.get ('/bruxo', async (req, res) => {
    try {
const resultado = await pool.query('SELECT * FROM bruxo');
res.json({
    total: resultado.rowCount,
    usuarios: resultado.rows}
);

    }catch (error) {
        console.log("Erro ao obter todos os bruxos", error);
        res.status(500).send({
            mensagem: "Erro ao obter todos os bruxos"
        })
}});

function calcularIdade(datadenascimento) {
    const hoje = new Date();
    let idade = hoje.getFullYear() - datadenascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = datadenascimento.getMonth();
    if (mesNascimento > mesAtual || (mesNascimento === mesAtual && hoje.getDate() < datadenascimento.getDate())) {
      idade--;
    }
    return idade;
  }


//POST
app.post('/bruxo', async (req, res) =>{
    try{
        const {nome, datadenascimento, casaH,habilidadeE, sangue } = req.body;
        let datadenascimento2 = new Date(datadenascimento);
        let idade = calcularIdade(datadenascimento2);

        await pool.query('INSERT INTO bruxo (nome, datadenascimento,idade, casaH, habilidadeE, sangue) VALUES ($1, $2, $3, $4, $5)', [nome,datadenascimento, idade, casaH, habilidadeE, sangue]);
        res.status(201).send({
            mensagem: "Bruxo cadastrado!!!!"
        })
    }
    catch (error) {
        console.log("Erro ao adicionar bruxo", error);
        res.status(500).send({
            mensagem: "Erro ao adicionar bruxo!!!!!!"
        })
}})







//rota teste
app.get('/', (req,res)=> {
    res.send('Servidor funcionando')
})




 //ulrtima coisa
app.listen(port, () =>{
    console.log('servidor rodando na porta ${port}')
})