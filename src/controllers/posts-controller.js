let posts=[{
    id: 1,
    titulo: 'Meu primeiro post',
    descricao:'Minha descricao',
    conteudo: 'Meu conteudo',
    imagem: 'https://images.freeimages.com/images/large-previews/a31/colorful-umbrella-1176220.jpg',
    data: '04/07/2003'
    
},
{
    id: 2,
    titulo: 'Meu segundo post',
    descricao:'Minha descricao',
    conteudo: 'Meu conteudo',
    imagem: 'https://images.freeimages.com/images/large-previews/a31/colorful-umbrella-1176220.jpg',
    data: '04/07/2003'
    
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

    async mostraAlterar(req, res) {
        const { id } = req.params;
        res.render('alterar', { post: posts })
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
        } = req.params
        let index;
        for(let i=0; i<posts.length;i++){
            
       if(posts[i].id== id){
           index= i;
       }
        }

        let comentariosDoPost=[];
        for(let i=0; i<comentarios.length; i++){
            console.log(comentarios[i].post)
            console.log(posts[index].id)
           if(comentarios[i].post ==posts[index].id){
               comentariosDoPost.push(comentarios[i])
           }
        }

        res.render('detalhar', {post: posts[index], comentarios:comentariosDoPost});
    }


    async cadastrar(req, res) {
        console.log(`Cadastrando um post`);
        console.log({ body: req.body });
        if(req.session.user.tipo == 'admin'){
            posts.push({
               id: nanoid(8),
            ...req.body
           });
            res.redirect('/posts');
           } else {
          res.send('Você não é administrador!');
        }
    }





    
    async alterar(req, res) {
        console.log({ body: req.body });
        const { id } = req.params;
        const { titulo, descricao, conteudo, imagem, data} = req.body;
        const postIdx = posts.findIndex(p => p.id == id);
       // posts[postIdx].id = id;
        posts[postIdx].titulo = titulo;
        posts[postIdx].descricao = descricao;
        posts[postIdx].conteudo = conteudo;
        posts[postIdx].imagem = imagem;
        posts[postIdx].data = data;
        res.redirect('/posts')
       // res.render('alterar', {id: req.params});
    }




    async deletar(req, res) {
        const { id } = req.params;
        // BUSCAR O FILME E REMOVER DO VETOR
        console.log({posts})
        if (req.session.user.tipo == 'admin') {
        const postIdx = posts.findIndex(p => p.id == id);
        posts.splice(postIdx, 1);
        // FILTRAR O VETOR DE FILMES BASEADO NO ID != DO ID DA REMOÇÃO
        // filmes = filmes.filter(f => f.id != id);
        } else {
            res.send('Você não é administrador!');
        }
        // BANCO - SQL COM DELETE WHERE
        return res.redirect('/posts')
    }

    async cadastrarComentario(req, res){
console.log(req.session.user)
    }
    async deletarComentario(req, res) {
        const { id } = req.params;
        // BUSCAR O FILME E REMOVER DO VETOR
        let comentario = comentario.findIndex(c => c.id == id);
        if (req.session.user.tipo == comentario.user ) {
        const comentarioIdx = comentarios.findIndex(p => p.id == id);
        comentarios.splice(comentarioIdx, 1);
        // FILTRAR O VETOR DE FILMES BASEADO NO ID != DO ID DA REMOÇÃO
        // filmes = filmes.filter(f => f.id != id);
        } else {
            res.send('Você  não fez esse comentário!');
        }
        // BANCO - SQL COM DELETE WHERE
        return res.redirect('/posts')
    }

}

module.exports = { PostsController }