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

    res.redirect("/login.html");
  }

  async detalhar(req, res) {
    res.render("detalharUsuario", { user: req.session.user });
  }

  async login(req, res) {
  
    const { email, senha, tipo } = req.body;
    let usuarioEncontrado;
    if(tipo== "user"|| tipo=="admin"){
    if (tipo == "user") {
        const filePathUsers = path.join(__dirname, "users.json");
        const users = JSON.parse(fs.readFileSync(filePathUsers, "utf8"));
    
      usuarioEncontrado = users.find((u) => u.email == email);
    } else {
        const filePathAdmins = path.join(__dirname, "admins.json");
        const admins = JSON.parse(fs.readFileSync(filePathAdmins, "utf8"));
    
      usuarioEncontrado = admins.find((u) => u.email == email);
    }
  
    if (!usuarioEncontrado) return res.send("Usuário não encontrado");
    console.log(usuarioEncontrado);
        
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
 
    req.session.destroy();
    return res.redirect('/posts');
}
}

module.exports = UsersController;
