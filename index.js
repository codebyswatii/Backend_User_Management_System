const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const { connect } = require('http2');
const methodOverride = require('method-override');
require('dotenv').config();

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "/views"));


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});


let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.get('/', (req, res) => {
  let q = 'SELECT count(*) FROM user';
    try {
  connection.query(q, (err, result) => {
    if (err) throw err;
    console.log(result[0]['count(*)']);
    // res.send('User count: ' + result[0]['count(*)']);
    let userCount = result[0]['count(*)'];
    res.render("home.ejs",{userCount});
  });
} catch (err) {
  console.log('Database connection error:', err);
  res.send('Database connection error');
  }
});

//Show all usersRoute
app.get('/users', (req, res) => {
  let q = 'SELECT * FROM user';
  try{
    connection.query(q, (err, users) => {
      if (err) throw err;
      // console.log(result);
      // res.send(result);
      res.render("showUsers.ejs",{users});
    });
  } catch (err) {
    console.log('Database connection error:', err);
    res.send('Database connection error');
  }

});

//Edit user route
app.get('/user/:id/edit', (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try{
    connection.query(q, (err, result) => { 
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs",{user});
    });
  } catch (err) {
    console.log('Database connection error:', err);
    res.send('Database connection error');
  } 
});

//Update user route(DB)
app.patch('/user/:id', (req, res) => {
  let {id} = req.params;
  let {password: formPass,username: newUsername} = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;

  try{
    connection.query(q, (err, result) => { 
      if (err) throw err;
        let user = result[0];
        if (formPass!=user.password) {
        res.send('Password incorrect. Cannot update username.');
        } else {
          let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
          connection.query(q2, (err, result) => {
            if (err) throw err;
            res.redirect('/users');
          });
        }
    });
  } catch (err) {
    console.log('Database connection error:', err);
    res.send('Database connection error');
  } 
});

// Show form to add new user
app.get('/users/new', (req, res) => {
  res.render('new.ejs');
});

// Add new user to DB
app.post('/users', (req, res) => {
  let { username, email, password } = req.body;

  let id = faker.string.uuid();

  let q = `
    INSERT INTO user (id, username, email, password)
    VALUES (?, ?, ?, ?)
  `;

  try {
    connection.query(q, [id, username, email, password], (err, result) => {
      if (err) throw err;
      res.redirect('/users');
    });
  } catch (err) {
    console.log(err);
    res.send('Error adding user');
  }
});

// Delete user route
app.delete('/user/:id', (req, res) => {
  let { id } = req.params;

  let q = `DELETE FROM user WHERE id = ?`;

  connection.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.send('Error deleting user');
    }
    res.redirect('/users');
  });
});


app.listen(8080, () => {
  console.log('Server is running on port 8080');
});



// connection.end();