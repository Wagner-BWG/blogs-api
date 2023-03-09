require('dotenv').config();
const app = require('./api');
const loginController = require('./controllers/loginController');
const validateToken = require('./auth/validateToken');
const {
  createUser, listAllUsers, listUniqueUser, deleteUser,
} = require('./controllers/userController');
const { createCategory, getAllCategories } = require('./controllers/categoryController');
const { 
  newPost, getAllPosts, getSinglePost, editUserPost, searchForPost,
} = require('./controllers/postController');

const port = process.env.API_PORT || 3000;

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
app.get('/post', validateToken, getAllPosts);
app.get('/post/search', validateToken, searchForPost);
app.get('/post/:id', validateToken, getSinglePost);
app.put('/post/:id', validateToken, editUserPost);

app.listen(port, () => console.log('ouvindo porta', port));
