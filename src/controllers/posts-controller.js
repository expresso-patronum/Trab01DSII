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

const { nanoid } = require('nanoid');

class PostsController {

    async mostraCadastro(req, res) {
        return res.render('cadastrar');
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
       

        res.render('detalhar', {post: posts[index]});
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
    async atualizar(req, res) {
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
}

module.exports = { PostsController }