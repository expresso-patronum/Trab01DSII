let posts=[{
    id: 1,
    titulo: 'Meu primeiro post',
    descricao:'Minha descricao',
    conteudo: 'Meu conteudo',
    imagem: 'https://images.freeimages.com/images/large-previews/a31/colorful-umbrella-1176220.jpg',
    data: '2003-07-07'
    
},
{
    id: 2,
    titulo: 'Aeu segundo post',
    descricao:'Minha descricao',
    conteudo: 'Meu conteudo',
    imagem: 'https://images.freeimages.com/images/large-previews/a31/colorful-umbrella-1176220.jpg',
    data: '2003-07-04'
    
}];

let comentarios=[{
    id: 1,
    post: 1,
    user: 1, 
    conteudo: 'Meu conteudo',
    data: '04/07/2003'
},
{
    id: 2,
    post: 2,
    user: 1,
    conteudo: 'Meu conteudo2',
    data: '04/07/2003',
}];

console.log({posts});

const { nanoid } = require('nanoid');


class PostsController {


    async mostraCadastro(req, res) {
        return res.render('cadastrar');
    }

        
    async dataDesc(req, res) {
        console.log('chegou aqui')
        posts.sort(function (a, b) {
            var c = new Date(a.data);
            var d = new Date(b.data);
            return d - c;
        });
        return res.redirect('/posts');
    } 

    async dataAsc(req, res) {
        posts.sort(function (a, b) {
            var c = new Date(a.data);
            var d = new Date(b.data);
            return c - d;
        });
        return res.redirect('/posts');
    }

    async tituloDesc(req, res) {
        posts.sort(function(a, b){
            if(a.titulo.toLowerCase() < b.titulo.toLowerCase()) { return 1; }
            if(a.titulo.toLowerCase() > b.titulo.toLowerCase()) { return -1; }
            return 0;
        });
        return res.redirect('/posts');
    }

    async tituloAsc(req, res) {
        console.log({posts})
        posts.sort(function(a, b){
            if(a.titulo.toLowerCase() < b.titulo.toLowerCase()) { return -1; }
            if(a.titulo.toLowerCase() > b.titulo.toLowerCase()) { return 1; }
            return 0;
        });
        return res.redirect('/posts');
    }

    async listar(req, res) {
        console.log('PAGINA INICIAL');
        console.log({ session: req.session });
        // LISTAGEM DE TODOS OS FILMES MOSTRANDO O NOME
        // O NOME É CLICAVEL E REDIRECIONA PARA O DETALHAR DO FILME
        // let html = '';
        // filmes.forEach(filme => {
        //     html += `<a href="/filmes/${filme.id}">${filme.nome}</a><br></br>`
        // })
        
        // return res.send(html);
        return res.render('listagem', { user: req.session.user, posts: posts });
    }

    

    async detalhar(req, res){
        const {
            id
        } = req.params;
        let index;
        for(let i=0; i<posts.length;i++){
            
       if(posts[i].id== id){
           index= i;
       }
        }

        let comentariosDoPost=[];
        for(let i=0; i<comentarios.length; i++){
            //console.log(comentarios[i].post)
            //console.log(posts[index].id)
           if(comentarios[i].post == posts[index].id){
               comentariosDoPost.push(comentarios[i])
           }
        }
        res.render('detalhar', {post: posts[index], comentarios:comentariosDoPost, user: req.session.user});
    }
    


    async cadastrar(req, res) {
        console.log(`Cadastrando um post`);
        console.log({ body: req.body });
        if(req.session.user !== undefined && req.session.user.tipo == 'admin'){
            posts.push({
               id: nanoid(8),
            ...req.body
           });
            res.redirect('/posts');
           } else {
          res.send('Você não é um administrador ou não está logado!');
        }
    }
    
    async alterar(req, res) {
        
        console.log({ body: req.body });
        const { id } = req.params;
        const { titulo, descricao, conteudo, imagem, data} = req.body;
        const postIdx = posts.findIndex(p => p.id == id);
       // posts[postIdx].id = id;
       //if(req.session.user.tipo == 'admin'){
        posts[postIdx].titulo = titulo;
        posts[postIdx].descricao = descricao;
        posts[postIdx].conteudo = conteudo;
        posts[postIdx].imagem = imagem;
        posts[postIdx].data = data;
        res.redirect('/posts');
      // } else {
        //res.send('Você não é administrador!');
       //}
       // res.render('alterar', {id: id});
    }




    async deletar(req, res) {
        const { id } = req.params;
        // BUSCAR O FILME E REMOVER DO VETOR
        if (req.session.user !== undefined && req.session.user.tipo == 'admin') {
        const postIdx = posts.findIndex(p => p.id == id);
        posts.splice(postIdx, 1);
        // FILTRAR O VETOR DE FILMES BASEADO NO ID != DO ID DA REMOÇÃO
        // filmes = filmes.filter(f => f.id != id);
        } else {
            res.send('Você não é um administrador ou não está logado!');
        }
        // BANCO - SQL COM DELETE WHERE
    // res.redirect('/posts')
    }

    async cadastrarComentario(req, res){
        console.log("AQUI COMEÇA O CADASTRAR COMENTARIO")
console.log(req.session.user)
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
//res.redirect('/posts');
res.redirect('/posts');
    }

}

module.exports = { PostsController }