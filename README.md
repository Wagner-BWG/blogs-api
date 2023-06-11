# ***Blogs API***

<!-- <details><summary><strong>Readme in English! 🇺🇸</strong> </summary><br /> -->

This is a small simple RESTful API for a blog site. It receives HTTP request in one of it's endpoints, checks if the request is valid, then retrieves data, such as user information and blog posts, from a SQL database and returns a response with such data as JSON and a proper HTTP status code.

It also contains a database directory where Sequelize ORM was used to create a local DB.

*This project was part of [Trybe](https://github.com/betrybe)'s web development course and their instruction team provided the dockerization (Dockerfile and docker-compose.yml) and the seeders and the connection config for the database.*

## How to use:

This application is hosted at a virtual server at ***AWS EC2***. You can use an API Client (such as Insomnia or Postman) to make requests to the server at http://3.21.122.82:3000/ followed by the endpoint. (e.g. http://3.21.122.82:3000/user )

<details><summary>To run this application locally:</summary>

Clone this repository and in its root folder execute the command `docker-compose up -d --build` to start up the dockerized app.
(Make sure your ports 3000 and 3306 are free as these are used by the containers)

Access the blog_api command line with the command: `docker exec -it blogs_api bash`

Inside the container, install de dependencies with `npm install`

Use `npm run prestart` to create the DB and make it's Sequelize migrations. Then use `npm run seed` to insert data into these DB.
(NOTE: if any error occurs, try using `npm run drop` to delete the DB than retry the process from `npm run prestsart` then `npm run seed`)

After that, use `npm start` to run the application.
Use an API Client (such as Insomnia or Postman) to make requests to the server at your local port 3000 (e.g. http://localhost:3000/user )
</details>

### Endpoints:

#### `POST /user`

Endpoit to create a new user and add them to the database.

<details><summary>How to use:</summary>
Send your request with a JSON body in the following format:

```
{
  "displayName": "wagner m barbosa",
  "email": "wag2@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```

And you'll receive a status code 201 and an access token such as:

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoid2FnQGVtYWlsLmNvbSIsImlhdCI6MTY4NDE4NzU2OCwiZXhwIjoxNjg0NzkyMzY4fQ.m6tXNHs2ovq90tMBwFelVIC2heJ1Z6W-kFwgUED7lCQ"
}
```

**IMPORTANT:** The `displayName` must be at least 8 characters long, the `password` must be at least 6 characters long adn the `email` must be in the format `<prefix@domain>`. Otherwise you will receive a status code 400  and error message explaining the error.
Each email can only be registered in the database once. If you try to create two users with the same email, you will receive a status code 409 message saying this `User already registered`.
</details>

#### `POST /login`

Endpoint used to log into the application.

<details><summary>How to use:</summary>
Send your request with a JSON body with a registred email and its password:

```
{
  "email": "wag2@email.com",
  "password": "123456"
}	
```

And you'll receive a status code 200 and an access token such as:

```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoid2FnMkBlbWFpbC5jb20iLCJpYXQiOjE2ODQxODc4ODYsImV4cCI6MTY4NDc5MjY4Nn0.1srT7-6mPWXaSvJX70EfKrexR5Szsz8Uo0K4cKfG5do"
}
```

If one or either the fields is blank, you'll receive a status code 400 and the message `Some required fields are missing`. If the email is not found in the database or the password doesn't match, you'll receive a status code 400 and the message `Invalid fields`.
</details>

#### `GET /user`

Endpoint to list all registered users in the database.

<details><summary>How to use:</summary>
Send a request with a valid token in the authorization header, and you will receive a status code 200 and a JSON similar to the following example:
```
[
	{
		"id": 1,
		"displayName": "Lewis Hamilton",
		"email": "lewishamilton@gmail.com",
		"image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
	},
	{
		"id": 2,
		"displayName": "Michael Schumacher",
		"email": "MichaelSchumacher@gmail.com",
		"image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
	},
	{
		"id": 3,
		"displayName": "wagner m barbosa",
		"email": "wag2@email.com",
		"image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
	}
]
```

If no authorization header is provided, you'll receive a status code 401 with the message `Token not found`.
If the token is invalid, you'll receive a status code 401 with the message `Expried or invalid token`.
</details>

#### `GET /user/:id`

Endpoint to list the registered users with the corresponding id in the database.

<details><summary>How to use:</summary>
Send a request with a valid token in the authorization header to the URL replacing `:id` with a number and, if the user with such id exists, you will receive a status code 200 and a JSON with the user info, similar to the following example:
```
{
  "id": 3,
  "displayName": "wagner m barbosa",
  "email": "wag2@email.com",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```
Else, you will receive a status code 404 and the message `User does not exist`.
If no authorization header is provided, you'll receive a status code 401 with the message `Token not found`.
If the token is invalid, you'll receive a status code 401 with the message `Expried or invalid token`.
</details>

#### `POST /categories`

Endpoint to register a new category of posts.

<details><summary>How to use:</summary>
Send a request with a valid token in the authorization header and a JSON body in the following format:
```
{
  "name": "New Category"
}
```
And you will receive a response with status code 201 and the and a JSON such as:
```
{
  "id": 3,
  "name": "New Category"
}
```
If the field `name` is blank, you'll receive a status code 400 with the message `\"name\" is required`.
If no authorization header is provided, you'll receive a status code 401 with the message `Token not found`.
If the token is invalid, you'll receive a status code 401 with the message `Expried or invalid token`.
</details>

#### `GET /categories`

Endpoint to list all registered post categories.

<details><summary>How to use:</summary>
Send a request with a valid token in the authorization header, and you will receive a status code 200 and a JSON similar to the following example:
```
[
	{
		"id": 1,
		"name": "Inovação",
		"createdAt": "2023-05-13T20:25:35.000Z",
		"updatedAt": "2023-05-13T20:25:35.000Z"
	},
	{
		"id": 2,
		"name": "Escola",
		"createdAt": "2023-05-13T20:25:35.000Z",
		"updatedAt": "2023-05-13T20:25:35.000Z"
	},
	{
		"id": 3,
		"name": "teste",
		"createdAt": "2023-05-16T20:21:30.000Z",
		"updatedAt": "2023-05-16T20:21:30.000Z"
	}
]
```
If no authorization header is provided, you'll receive a status code 401 with the message `Token not found`.
If the token is invalid, you'll receive a status code 401 with the message `Expried or invalid token`.
</details>

#### `POST /post`

Endpoint to create a new blog post.

<details><summary>How to use:</summary>
Send a request with a valid token in the authorization header and a JSON body with a key for the post title, a key for the post's text and a key with the ids of the categories this post will fall into, such as the example:
```
{
  "title": "The title of this post",
  "content": "The whole text for the blog post goes here in this key.",
  "categoryIds": [1, 2]
}
```
And you'll receive response with a status code 201 and a JSON like:
```
{
  "id": 3,
  "title": "The title of this post",
  "content": "The whole text for the blog post goes here in this key.",
  "userId": 3,
  "updated": "2022-05-18T18:00:01.196Z",
  "published": "2022-05-18T18:00:01.196Z"
}
```
If one of the fields is blank, you'll receive a status code 400 and the message `Some required fields are missing`.
If one of the category ids do not match any of the registered post categories, you'll receive a status code 400 and the message `\"categoryIds\" not found`.
If no authorization header is provided, you'll receive a status code 401 with the message `Token not found`.
If the token is invalid, you'll receive a status code 401 with the message `Expried or invalid token`.
</details>

#### `GET /post`

Endpont to list all posts in the database.

<details><summary>How to use:</summary>
Send a request with a valid token in the authorization header, and you will receive a status code 200 and a JSON similar to the following example:
```
[
	{
		"id": 1,
		"title": "Post do Ano",
		"content": "Melhor post do ano",
		"userId": 1,
		"published": "2011-08-01T19:58:00.000Z",
		"updated": "2011-08-01T19:58:51.000Z",
		"user": {
			"id": 1,
			"displayName": "Lewis Hamilton",
			"email": "lewishamilton@gmail.com",
			"image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
		},
		"categories": [
			{
				"id": 1,
				"name": "Inovação",
				"createdAt": "2023-05-13T20:25:35.000Z",
				"updatedAt": "2023-05-13T20:25:35.000Z"
			}
		]
	},
	{
		"id": 2,
		"title": "Vamos que vamos",
		"content": "Foguete não tem ré",
		"userId": 1,
		"published": "2011-08-01T19:58:00.000Z",
		"updated": "2011-08-01T19:58:51.000Z",
		"user": {
			"id": 1,
			"displayName": "Lewis Hamilton",
			"email": "lewishamilton@gmail.com",
			"image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
		},
		"categories": [
			{
				"id": 2,
				"name": "Escola",
				"createdAt": "2023-05-13T20:25:35.000Z",
				"updatedAt": "2023-05-13T20:25:35.000Z"
			}
		]
	}
]
```
If no authorization header is provided, you'll receive a status code 401 with the message `Token not found`.
If the token is invalid, you'll receive a status code 401 with the message `Expried or invalid token`.
</details>

#### `GET /post/:id`

Endpoint to list the post with the corresponding id in the database.

<details><summary>How to use:</summary>
Send a request with a valid token in the authorization header to the URL replacing `:id` with a number and, if the post with such id exists, you will receive a status code 200 and a JSON with the post contents and info, similar to the following example:
```
{
	"id": 1,
	"title": "Post do Ano",
	"content": "Melhor post do ano",
	"userId": 1,
	"published": "2011-08-01T19:58:00.000Z",
	"updated": "2011-08-01T19:58:51.000Z",
	"user": {
		"id": 1,
		"displayName": "Lewis Hamilton",
		"email": "lewishamilton@gmail.com",
		"image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
	},
	"categories": [
		{
			"id": 1,
			"name": "Inovação",
			"createdAt": "2023-05-13T20:25:35.000Z",
			"updatedAt": "2023-05-13T20:25:35.000Z"
		}
	]
}
```
Else, you will receive a status code 404 and the message `Post does not exist`.
If no authorization header is provided, you'll receive a status code 401 with the message `Token not found`.
If the token is invalid, you'll receive a status code 401 with the message `Expried or invalid token`.
</details>

#### `PUT /post/:id`

Endpoint to edit the contents of an existing post.

<details><summary>How to use:</summary>
Send a request with a valid token in the authorization header and a JSON body in the following format to the URL replacinh `:id` with the number for the post id.
```
{
  "title": "New title",
  "content": "New text."
}
```
If the post with such id exists, you will receive a status code 200 and a JSON with the post contents and info, similar to the following example:
```
{
  "id": 3,
  "title": "New title",
  "content": "New text."
  "userId": 1,
  "published": "2022-05-18T18:00:01.000Z",
  "updated": "2022-05-18T18:07:32.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    },
    {
      "id": 2,
      "name": "Escola"
    }
  ]
}
```
If the token doesn't correspond to the user who created the post, you'll receive a status code 401 and the message `Unauthorized user`.
If one or both fields are blank, you'll receibe a status code 400 and the message `Some required fields are missing`.
If no authorization header is provided, you'll receive a status code 401 with the message `Token not found`.
If the token is invalid, you'll receive a status code 401 with the message `Expried or invalid token`.
</details>

#### `GET /post/search?q=:searchTerm`

Endpoint to search the database for posts that contain the `searchTerm` in their title or content.

<details><summary>How to use:</summary>
Send a request with a valid token in the authorization header and query `q`, such as `/post/search?q=exam`, and you will receive a status code 200 and a JSON such as:
```
[
	{
		"id": 2,
		"title": "Example",
		"content": "Post's text",
		"userId": 1,
		"published": "2011-08-01T19:58:00.000Z",
		"updated": "2011-08-01T19:58:51.000Z",
		"user": {
			"id": 2,
			"displayName": "Michael Schumacher",
			"email": "MichaelSchumacher@gmail.com",
			"image": "https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg"
		},
		"categories": [
			{
				"id": 2,
				"name": "Escola",
				"createdAt": "2023-03-09T18:20:45.000Z",
				"updatedAt": "2023-03-09T18:20:45.000Z"
			}
		]
	}
]
```
Where the title **Exam**ple corresponds to the search query *exam*.
If no authorization header is provided, you'll receive a status code 401 with the message `Token not found`.
If the token is invalid, you'll receive a status code 401 with the message `Expried or invalid token`.
</details>