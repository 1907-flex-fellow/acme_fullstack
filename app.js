const express = require('express');
const app = express();
const path = require('path');
const { User } = require('./db').models;

module.exports = app;

app.use('/build', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json())

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next)=> {
  User.findAll()
    .then( users=> res.send(users))
    .catch(next);
});

app.delete('/api/users/:id', (req, res, next)=> {
  User.findByPk(req.params.id)
    .then( user => user.destroy())
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.put('/api/users/:id', (req, res, next)=> {
  User.findByPk(req.params.id)
    .then( user => user.update({ ...user, active: !user.active}))
    .then( user => res.send(user))
    .catch(next)
});

app.post('/api/users', (req, res, next)=> {
  console.log('req.body: ', req.body)
  User.create(req.body)
    .then( user => res.status(201).send(user))
    .catch(next)
})


app.use((error, req, res, next)=>{
  console.log('Errors from server: ', error);
  console.log('Errors from Object.keys: errors', Object.keys(error))
  let errors = [error];
  if(error.errors){
      errors = error.errors.map( error => error.message);
  }
  else if(error.original){
      errors = [error.original.message];
  }
  res.status(error.status || 500).send({errors})
})