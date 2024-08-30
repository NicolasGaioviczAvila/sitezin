const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require("../postgre-con");
const jwt = require('jsonwebtoken');
const auth = require("../auth");
const SECRET = 'nicolas';
const path = require('path');

// Endpoint de login
router.post('/get-login', async function(req, res) {
    const {email, password} = req.body;
    console.log("email: "+ email);
    console.log("password: "+password);
   

    try {
        const usuario = await db(`select id_usuario as id, gmail as gmailbd, senha as senhabd from TblUsuario where gmail like ?`, [email]);
        const result = await bcrypt.compare(password, usuario[0].senhabd);
        const id = usuario[0].id;

        if(result){
            const token = jwt.sign({userid: id}, SECRET);
            res.cookie("token", token, {httpOnly: true}).json({
                resultado : "logado"
            });
            
        } else{
            console.log("erro")
            res.status(400).json({
                resultado : "erro"
            });
        }

        

    }catch(err){
        return console.log("merda", err);
        
    }
});

router.post('/post-signin', async function(req, res) {
    const { username, email,  password, imagem } = req.body;
    const passwordHash = await bcrypt.hash(password, 8);
    
    try {
        const resultado = await db(`CALL sp_signin(?, ?, ?, ?);`, [username, email, passwordHash, imagem]);

        if(resultado.sqlMessage == "nome"){
            res.status(200).json({
                resultado : "nome"
            });
            return;
        }else if(resultado.sqlMessage == "gmail"){
            res.status(200).json({
                resultado : "gmail"
            });
            return;
        } 
        res.status(200).json({
            resultado : "Usuario cadastrado"
        })
        
    }catch(err){
        res.status(404).send("falha de comunicação com o banco de dados \n erro: ", err);
    }
});

router.get("/get-usuario", auth,  async function (req, res){

    try{
        const id = req.userid;
        const usuario = await db(`select id_usuario, nome, foto_de_perfil from TblUsuario where id_usuario = ?`, [id]);
        res.send(usuario)
    }catch(err){
        res.status(404).send("usuario nao encontrado", err);
    }
});

module.exports = router;