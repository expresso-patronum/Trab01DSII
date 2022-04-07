const users = [];
const admins = [
  {
    id: 1,
    nome: "Adriele",
    email: "adriele@adriele",
    senha: "oioi",
    tipo: "admin",
  },
];

const { nanoid } = require("nanoid");
/*
const path= require('path');
const fs= require('fs');

const filePathAdmins = path.join(__dirname,  'admins.json' );
const filePathUsers = path.join(__dirname,  'users.json' );

const users= fs.readFileSync(filePathUsers,'utf8');
const admins=fs.readFileSync(filePathAdmins,'utf8');*/

const path= require('path');
const fs= require('fs');

class UsersController {

  async cadastrar(req, res) {
    const user = req.body;

    if (user.tipo == "user") {
      const filePathUsers = path.join(__dirname, "users.json");
      const users = JSON.parse(fs.readFileSync(filePathUsers, "utf8"));
      users.push({
        id: nanoid(8),
        ...user,
      });
      fs.writeFile(
        filePathUsers,
        JSON.stringify(users),
        function writeJSON(err) {
          if (err) return console.log(err);
        }
      );
    } else {
      const filePathAdmins = path.join(__dirname, "admins.json");
      const admins = JSON.parse(fs.readFileSync(filePathAdmins, "utf8"));
    
      admins.push({
        id: nanoid(8),
        ...user,
      });
      fs.writeFile(
        filePathAdmins,
        JSON.stringify(admins),
        function writeJSON(err) {
          if (err) return console.log(err);
        }
      );
    }
    console.log({ users });
    console.log({ admins });
    res.redirect("/login.html");
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
    res.render("detalharUsuario", { user: req.session.user });
  }

  async login(req, res) {
    // ACHAR COM O EMAIL CERTO
    const { email, senha, tipo } = req.body;
    let usuarioEncontrado;
    if(tipo== "user"|| tipo=="admin"){
    if (tipo == "user") {
        const filePathUsers = path.join(__dirname, "users.json");
        const users = JSON.parse(fs.readFileSync(filePathUsers, "utf8"));
      console.log("oi user");
      usuarioEncontrado = users.find((u) => u.email == email);
    } else {
        const filePathAdmins = path.join(__dirname, "admins.json");
        const admins = JSON.parse(fs.readFileSync(filePathAdmins, "utf8"));
      console.log("oi adm");
      usuarioEncontrado = admins.find((u) => u.email == email);
    }
  
    if (!usuarioEncontrado) return res.send("Usuário não encontrado");
    console.log(usuarioEncontrado);
        // VERIFICAR A SENHA
        if (usuarioEncontrado.senha == senha) {
          req.session.user = usuarioEncontrado;
          res.redirect("/posts");
        } else {
          return res.send("Senha não confere.");
        }
  } else{
    return res.send("Volte e selecione o tipo de usuário.");
  }
    
  }

  async logout(req, res) {
    console.log("Passei por aqui...");
    req.session.destroy();
    return res.redirect('/posts');
}
}

module.exports = UsersController;
