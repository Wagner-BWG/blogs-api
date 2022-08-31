require('dotenv').config();
const app = require('./api');
const loginController = require('./controllers/loginController');
const validateToken = require('./auth/validateToken');
const {
  createUser, listAllUsers, listUniqueUser, deleteUser,
} = require('./controllers/userController');
const { createCategory, getAllCategories } = require('./controllers/categoryController');
const { newPost } = require('./controllers/postController');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginController);

app.get('/user', validateToken, listAllUsers);
app.get('/user/:id', validateToken, listUniqueUser);
app.post('/user', createUser);
app.delete('/user', deleteUser);

app.post('/categories', validateToken, createCategory);
app.get('/categories', validateToken, getAllCategories);

app.post('/post', validateToken, newPost);

app.listen(port, () => console.log('ouvindo porta', port));
