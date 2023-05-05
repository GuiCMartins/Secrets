const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
});

const userSchema = mongoose.Schema({
  email: String,
  pass: String,
});

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
  res.send('Meu primerio serviço :)');
});

app.post('/register', (req, res) => {
  const { email, pass } = req.body;
  const newUser = new User({
    email,
    pass,
  });

  newUser
    .save()
    .then((err) => {
      res.send('usuário criado com sucesso');
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/login', (req, res) => {
  const { email, pass } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.pass === pass) {
          res.send('Usuário logado com sucesso');
        } else {
          res.send('Credenciais inválidas');
        }
      } else {
        res.send('Credenciais inválidas');
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3001, () => {
  console.log('Server started');
});
