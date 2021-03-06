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

routes.get('/dataDesc', postsController.dataDesc);

routes.get('/dataAsc', postsController.dataAsc);

routes.get('/tituloDesc', postsController.tituloDesc);

routes.get('/tituloAsc', postsController.tituloAsc);

routes.get('/:id', postsController.detalhar);

routes.post('/', postsController.cadastrar);



//routes.get('/alterar/:id', postsController.mostraAlterar);

routes.post('/alterar/:id', postsController.alterar);
routes.post('/deletar/:id', postsController.deletar);
//routes.post('/:id', postsController.cadastrarComentario);

module.exports = routes;