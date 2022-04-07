
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/view');

// PARSER DOS FORMULÁRIOS
app.use(express.urlencoded({
    extended: true,
}));

// PARSER DAS REQUISIÇOES COM JSON
app.use(express.json());

const session = require('express-session');
const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: 'chave secreta de criptografia',
    resave: false, // NAO SOBRESCREVER CASO NAO HAJA MODIFICAÇÕES,
    saveUninitialized: false,
    cookie: { secure: false }//, maxAge: oneDay 
}))


app.use(express.static('public'));

/* 
SEMPRE QUE UTILIZAMOS APP.USE ESTAMOS INCLUINDO UM MIDDLEWARE !!!

MIDDLEWARE É UMA FUNÇÃO QUE EXECUTA ENTRE O REQUEST E O ENDPOINT FINAL, PERMITINDO QUE SEJA VERIFICADO, INCLUIDO, TESTADO, QUALQUER CÓDIGO, ANTES DE "PASSAR PARA FRENTE" NEXT() FUNCTION
*/
app.use('*', (req, res, next) => {
    console.log(`Request recebido para ${req.baseUrl} as ${new Date()}`);

    // atrasando o usuario kkkkk
    // setTimeout(() => next(), 1000);
    next();
})

app.get('/', (req, res) => {
    res.redirect('/posts');
});

const postsRoutes = require('./routes/posts-routes');
app.use('/posts', postsRoutes);

const usersRoutes = require('./routes/users-routes');
app.use('/users', usersRoutes);

const comentariosRoutes = require('./routes/comentarios-routes');
app.use('/comentarios', comentariosRoutes)

app.use("*", (req, res, next)=>{

    res.redirect('/erro.html');
  
 })

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server iniciado na porta ' + PORT));