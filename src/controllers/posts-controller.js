

const { nanoid } = require('nanoid');

const path= require('path');
const fs= require('fs');

const filePathComentarios = path.join(__dirname,  'comentarios.json' );
const comentarios=fs.readFileSync(filePathComentarios,'utf8');

const filePathUsers = path.join(__dirname,  'users.json' );
const users= fs.readFileSync(filePathUsers,'utf8');
const filePathAdmins = path.join(__dirname,  'admins.json' );
const admins=fs.readFileSync(filePathAdmins,'utf8');


class PostsController {
    async mostraCadastro(req, res) {
        return res.render('cadastrar');
    }

        
    async dataDesc(req, res) {
        const filePathPosts = path.join(__dirname,  'posts.json' );   
        const posts = JSON.parse(fs.readFileSync(filePathPosts,'utf8'));
        posts.sort(function (a, b) {
            var c = new Date(a.data);
            var d = new Date(b.data);
            return d - c;
        });
        fs.writeFile(filePathPosts, JSON.stringify(posts), function writeJSON(err) {
            if (err) return console.log(err);
          });
        return res.redirect('/posts');
    } 

    async dataAsc(req, res) {
        const filePathPosts = path.join(__dirname,  'posts.json' );   
        const posts = JSON.parse(fs.readFileSync(filePathPosts,'utf8'));
        posts.sort(function (a, b) {
            var c = new Date(a.data);
            var d = new Date(b.data);
            return c - d;
        });
        fs.writeFile(filePathPosts, JSON.stringify(posts), function writeJSON(err) {
            if (err) return console.log(err);
          });
        return res.redirect('/posts');
    }

    async tituloDesc(req, res) {
        
        const filePathPosts = path.join(__dirname,  'posts.json' );   
        const posts = JSON.parse(fs.readFileSync(filePathPosts,'utf8'));
        posts.sort(function(a, b){
            if(a.titulo.toLowerCase() < b.titulo.toLowerCase()) { return 1; }
            if(a.titulo.toLowerCase() > b.titulo.toLowerCase()) { return -1; }
            return 0;
        });
        fs.writeFile(filePathPosts, JSON.stringify(posts), function writeJSON(err) {
            if (err) return console.log(err);
          });
        return res.redirect('/posts');
    }

    async tituloAsc(req, res) {
        const filePathPosts = path.join(__dirname,  'posts.json' );   
        const posts = JSON.parse(fs.readFileSync(filePathPosts,'utf8'));
        
        posts.sort(function(a, b){
            if(a.titulo.toLowerCase() < b.titulo.toLowerCase()) { return -1; }
            if(a.titulo.toLowerCase() > b.titulo.toLowerCase()) { return 1; }
            return 0;
        });
        fs.writeFile(filePathPosts, JSON.stringify(posts), function writeJSON(err) {
  if (err) return console.log(err);
});
        return res.redirect('/posts');
    }

    async listar(req, res) {
        console.log('PAGINA INICIAL');
        console.log({ session: req.session });

        const filePathPosts = path.join(__dirname,  'posts.json' );   
         const posts = JSON.parse(fs.readFileSync(filePathPosts,'utf8'));
    
       return res.render('listagem', { user: req.session.user, posts: posts });
    }

    

    async detalhar(req, res){

        const {
            id
        } = req.params;
        let index;
        const filePathPosts = path.join(__dirname,  'posts.json' );   
        const posts = JSON.parse(fs.readFileSync(filePathPosts,'utf8'));
        const filePathComentarios = path.join(__dirname,  'comentarios.json' );
        const comentarios=JSON.parse(fs.readFileSync(filePathComentarios,'utf8'));
        const filePathUsers = path.join(__dirname,  'users.json' );
        const users=JSON.parse(fs.readFileSync(filePathUsers,'utf8'));
        const filePathAdmins = path.join(__dirname,  'admins.json' );
        const admins=JSON.parse(fs.readFileSync(filePathAdmins,'utf8'));
   
        for(let i=0; i<posts.length;i++){
            
       if(posts[i].id== id){
           index= i;
       }
        }
   
        let comentariosDoPost=[];
        for(let i=0; i<comentarios.length; i++){
        
           if(comentarios[i].post == posts[index].id){
               comentariosDoPost.push(comentarios[i])
           }
        }
        let usuariosQueComentaram=[]
        for(let i2=0; i2<comentarios.length; i2++){
            usuariosQueComentaram.push(comentarios[i2].user)
        }
    
       res.render('detalhar', {post: posts[index], comentarios:comentariosDoPost, users: usuariosQueComentaram})
    }
    


    async cadastrar(req, res) {
        console.log(`Cadastrando um post`);
        console.log({ body: req.body });
        const filePathPosts = path.join(__dirname,  'posts.json' );   
        const posts = JSON.parse(fs.readFileSync(filePathPosts,'utf8'));
        if(req.session.user !== undefined && req.session.user.tipo == 'admin'){
            posts.push({
               id: nanoid(8),
            ...req.body
           });
           fs.writeFile(filePathPosts, JSON.stringify(posts), function writeJSON(err) {
            if (err) return console.log(err);
          });
            res.redirect('/posts');
           } else {
            res.render('erroPermissao');
        }
    }
    
    async deletar(req, res) {
        const { id } = req.params;
        const filePathPosts = path.join(__dirname,  'posts.json' );   
        const posts = JSON.parse(fs.readFileSync(filePathPosts,'utf8'));
       
     
        if(req.session.user !== undefined && req.session.user.tipo == 'admin'){
        const postIdx = posts.findIndex(p => p.id == id);
        posts.splice(postIdx, 1);
        fs.writeFile(filePathPosts, JSON.stringify(posts), function writeJSON(err) {
            if (err) return console.log(err);
          });
      
        res.redirect('/posts')
        } else {
            res.render('erroPermissao')
            
        }
     
    }

    async alterar(req, res) {
        const filePathPosts = path.join(__dirname,  'posts.json' );   
        const posts = JSON.parse(fs.readFileSync(filePathPosts,'utf8'));
        const { id } = req.params;
        const { titulo, descricao, conteudo, imagem, data} = req.body;
        if(req.session.user !== undefined && req.session.user.tipo == 'admin'){
        const postIdx = posts.findIndex(p => p.id == id);
    
        posts[postIdx].titulo = titulo;
        posts[postIdx].descricao = descricao;
        posts[postIdx].conteudo = conteudo;
        posts[postIdx].imagem = imagem;
        posts[postIdx].data = data;
        fs.writeFile(filePathPosts, JSON.stringify(posts), function writeJSON(err) {
            if (err) return console.log(err);
          });
        res.redirect('/posts');
        } else {
            res.render('erroPermissao')
        }
 
    }




  


}

module.exports = { PostsController }
