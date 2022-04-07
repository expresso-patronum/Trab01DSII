const { Router } = require('express');

// IMPORTAÇÃO DO posts-CONTROLLER
// CONST NOME-RECURSO = REQUIRE(ARQUIVO);
const { ComentariosController } = require('../controllers/comentarios-controller');

// const Router = require('express').Router

// const express = require('express')
// const Router = express.Router

// O NOSSO ROUTER COMEÇA COM /posts
const routes = Router();

const comentariosController = new ComentariosController();


routes.post('/cadastrarComentario', comentariosController.cadastrarComentario);

module.exports = routes;