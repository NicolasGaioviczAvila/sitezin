const express = require("express");
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken');
const auth = require('../api/auth');
SECRET = 'nicolas';

router.get('/inicio', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
router.get('/sobre', function(req,res){
    res.sendFile(path.join(__dirname+'/sobre.html'));

});
router.get('/dev', function(req,res){
    res.sendFile(path.join(__dirname+'/dev.html'));

});
router.get('/comunidade', function(req,res){
    res.sendFile(path.join(__dirname+'/comunidade.html'));

});
router.get('/forum', auth, function(req,res){
    res.sendFile(path.join(__dirname+'/forum.html'));

});
router.get('/esqueceu', function(req,res){
    res.sendFile(path.join(__dirname+'/esqueceu.html'));

});
router.get('/criar', function(req,res){
    res.sendFile(path.join(__dirname+'/criar.html'));

});
router.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/login.html'));
});


module.exports = router;