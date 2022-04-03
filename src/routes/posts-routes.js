const { Router } = require('express');

// IMPORTAÇÃO DO posts-CONTROLLER
// CONST NOME-RECURSO = REQUIRE(ARQUIVO);
const { PostsController } = require('../controllers/posts-controller');

// const Router = require('express').Router

// const express = require('express')
// const Router = express.Router

// O NOSSO ROUTER COMEÇA COM /posts
const routes = Router();

const postsController = new PostsController();

routes.get('/cadastrar', postsController.mostraCadastro);

routes.get('/', postsController.listar);

routes.get('/:id', postsController.detalhar);

routes.post('/', postsController.cadastrar);

routes.get('/deletar/:id', postsController.deletar);

routes.get('/alterar/:id', postsController.mostraAlterar);

routes.post('/alterar/:id', postsController.alterar);

routes.post('/comentario', postsController.cadastrarComentario);

module.exports = routes;