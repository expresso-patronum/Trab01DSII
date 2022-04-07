

const { nanoid } = require('nanoid');

const path= require('path');
const fs= require('fs');

const filePathComentarios = path.join(__dirname,  'comentarios.json' );
const comentarios=fs.readFileSync(filePathComentarios,'utf8');

const filePathUsers = path.join(__dirname,  'users.json' );
const users= fs.readFileSync(filePathUsers,'utf8');
const filePathAdmins = path.join(__dirname,  'admins.json' );
const admins=fs.readFileSync(filePathAdmins,'utf8');


class ComentariosController {



    async cadastrarComentario(req, res){
       if(req.session.user !== undefined) {
        const filePathComentarios = path.join(__dirname,  'comentarios.json' );
const comentarios=JSON.parse(fs.readFileSync(filePathComentarios,'utf8'));
const { id } = req.params;
const comentariosIdx = comentarios.length
const { post, conteudo } = req.body;
let comentarioNovo = new Object();
comentarioNovo.post = post;
comentarioNovo.user = req.session.user;
comentarioNovo.conteudo = conteudo;
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
comentarioNovo.data = date;
comentarios.push(comentarioNovo);
fs.writeFile(filePathComentarios, JSON.stringify(comentarios), function writeJSON(err) {
    if (err) return console.log(err);
  });
res.redirect(req.get('referer'));
    } else {
        res.render('erroPermissao');
    }
}





}

module.exports = { ComentariosController }