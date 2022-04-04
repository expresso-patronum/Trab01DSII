const users = [];
const admins = [{
    id:1,
    nome: 'Adriele',
    email: 'adriele@adriele',
    senha: 'oioi',
    tipo: 'admin'

}];
const { nanoid } = require('nanoid');

class UsersController {
    async cadastrar(req, res) {
        console.log('UsersController/cadastrar');

        const user = req.body;

        if(user.tipo == 'user') {
            users.push({
                id: nanoid(8),
                ...user});
           } else {
            admins.push({
                id: nanoid(8),
                ...user});
           }
           console.log({ users });
           console.log({ admins });
           res.redirect('/login.html')
    }


    async detalhar(req, res) {
        /*
        const user = req.body;
        const {
            id
        } = req.params;
        let index;

        if(user.tipo = 'user') {

        for(let i=0; i< users .length;i++){
            
       if( users [i].id== id){
           index= i;
       }
        }
        res.render('detalharUsuario', {user: users[index]});
    } if(user.tipo = 'admin') {
        for(let i=0; i< admins .length;i++){
            
            if( admins [i].id== id){
                index= i;
            }
             }
            
     
             res.render('detalharUsuario', {user: admins[index]});
    }
    */
    res.render('detalharUsuario', {user: req.session.user});
    }
    

    async login(req, res) {
        // ACHAR COM O EMAIL CERTO
        const { email, senha, tipo } = req.body;
        let usuarioEcontrado;
        if(tipo == 'user'){
        console.log('oi user');
        console.log(tipo)
            usuarioEcontrado = users.find(u=>u.email == email)
        } else {
          console.log('oi adm');
            usuarioEcontrado = admins.find(u=>u.email == email) 
       }
        if (!usuarioEcontrado) return res.send('Usuário não encontrado');

        // VERIFICAR A SENHA
        if (usuarioEcontrado.senha == senha) {
            req.session.user = usuarioEcontrado;
            return res.send('Login feito com sucesso!');
            
        } else {
            return res.send('Senha não confere.');
        }
    }
}

module.exports = UsersController;
