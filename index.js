const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 4000

app.use(express.json())
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "harryback",
    password: "ds564",
    port: 7007
});

//GET BRUXO
app.get('/bruxo', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM bruxo');
        res.json({
            total: resultado.rowCount,
            bruxos: resultado.rows
        }
        );

    } catch (error) {
        console.log("Erro ao obter todos os bruxos", error);
        res.status(500).send({
            mensagem: "Erro ao obter todos os bruxos"
        })
    }
});

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


//POST BRUXO
app.post('/bruxo', async (req, res) => {
    try {
        const { nome, datadenascimento, casaH, habilidadeE, sangue, patrono } = req.body;
        const sangueV = ["puro", "mestiço", "trouxa"];
        if (!sangueV.includes(sangue)) {
            res.status(400).send({
                mensagem: "Sangue inválido"
            })
        } else {
            let datadenascimento2 = new Date(datadenascimento);
            let idade = calcularIdade(datadenascimento2);

            await pool.query('INSERT INTO bruxo (nome, datadenascimento,idade, casaH, habilidadeE, sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6, $7)', [nome, datadenascimento, idade, casaH, habilidadeE, sangue, patrono]);
            res.status(201).send({
                mensagem: "Bruxo cadastrado!!!!"
            })
        }
    }
    catch (error) {
        console.log("Erro ao adicionar bruxo", error);
        res.status(400).send({
            mensagem: "Erro ao adicionar bruxo!!!!!!"
        })
    }
})


//DELETE BRUXO
app.delete('/bruxo/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query('DELETE FROM bruxo WHERE id = $1', [id])
        res.status(200).send({ mensagem: "Bruxo deletado com sucesso!!!!!" })

    } catch (error) {
        console.log("Erro ao deletar");
        res.status(400).send({
            mensagem: "Erro ao deletar"
        })
    }
})

//UPDATE BRUXO
app.put('/bruxo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, datadenascimento, casaH, habilidadeE, sangue, patrono } = req.body;
        let datadenascimento2 = new Date(datadenascimento);
        let idade = calcularIdade(datadenascimento2);

        await pool.query('UPDATE bruxo SET nome = $1, datadenascimento = $2,idade = $3, casaH = $4, habilidadeE = $5, sangue = $6, patrono = $7 WHERE id = $8', [nome, datadenascimento, idade, casaH, habilidadeE, sangue, patrono, id]);
        res.status(200).send({ mensagem: "Bruxo updatado!!!!!!" })

    } catch (error) {
        console.log("Erro ao editar bruxo", error);
        res.status(400).send({
            mensagem: "Erro ao editar este bruxo"
        })
    }
})


//GET VARINHA
app.get ('/varinha', async (req, res) => {
    try {
const resultado = await pool.query('SELECT * FROM varinha');
res.json({
    total: resultado.rowCount,
    varinhas: resultado.rows}
);

    }catch (error) {
        console.log("Erro ao obter todas as varinhas");
        res.status(400).send({
            mensagem: "Erro ao obter todas as varinhas"
        })
}});

//POST VARINHA
app.post('/varinha', async (req, res) =>{
    try{
        const {material,comprimento,nucleo, dataF} = req.body;
      

        await pool.query('INSERT INTO varinha (material,comprimento,nucleo, dataF) VALUES ($1, $2, $3, $4)', [material,comprimento,nucleo, dataF]);
        res.status(201).send({
            mensagem: "Varinha feita com sucesso"
        })
    }
    catch (error) {
        console.log("Erro ao criar varinha", error);
        res.status(400).send({
            mensagem: "Erro ao criar varinha!!!!!!"
        })
}})
//DELETE VARINHA
app.delete('/varinha/:id', async (req, res) =>{
    try{
const {id} = req.params;

await pool.query('DELETE FROM varinha WHERE id = $1', [id])
        res.status(200).send({mensagem: "Varinha deletada com sucesso" })

    }catch(error){
        console.log("Erro ao deletar varinha!!!", error);
        res.status(400).send({
            mensagem: "Erro ao deletar varinha!!!!"
        })
    }
})

//UPDATE VARINHA
app.put('/varinha/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material,comprimento,nucleo, dataF} = req.body;

        await pool.query('UPDATE varinha SET material = $1, comprimento = $2,nucleo = $3, dataF = $4 WHERE id = $5', [material,comprimento,nucleo, dataF, id]);
        res.status(200).send({ mensagem: "Bruxo updatado!!!!!!" })

    } catch (error) {
        console.log("Erro ao editar varinha", error);
        res.status(400).send({
            mensagem: "Erro ao editar varinha!!!!!!!!"
        })
    }
})















//rota teste
app.get('/', (req, res) => {
    res.send('Servidor funcionando')
})




//ulrtima coisa
app.listen(port, () => {
    console.log('servidor rodando na porta ${port}')
})