<div id="top"></div>

<br />
<div align="center">
  <h3 align="center">Plancraft Coding Challenge</h3>

  <p align="center">
    Caching
    <br />
  </p>
</div>
<br />
<br />

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#scripts">Scripts</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
<br />
<br />

<!-- ABOUT THE SERVICE -->

## About The Service
This service  is a  REST API written in TypeScript that exposes methods to interact
with a cache

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Typescript](https://www.typescriptlang.org)
- [Node.js](https://nodejs.org/en/)
- [Redis](https://redis.io)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

\_Below is an instruction on how to install and set up your app.

#### Normal

1. Clone the repo

   ```sh
   git clone https://github.com/nnamdi16/plancraft-coding-challenge.git
   ```

2. Cd into the directory

   ```sh
   cd plancraft-coding-challenge
   ```

3. Install NPM packages and Yarn, in your root directory of the project run the command below

   ```sh
   yarn
   ```

4. Create an .env and copy the template from .env.sample

   ```sh
   touch .env
   ```

5. Copy the value inside .env.sample into the .env and fill the values for the necessary config

6. Make sure your server Redis and Redis client is running locally

  ```sh
   redis-server  - for redis server

   redis-commander - for redis client
   ```

7. Run the application

   ```sh
   yarn run dev
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Scripts

- `yarn build` - Compiles src code into dist
- `yarn start` - Starts the app in production mode
- `yarn run dev` - Starts the app in development mode
- `yarn test`: Run tests
- `yarn run lint`: Lint code using ESLint


<p align="right">(<a href="#top">back to top</a>)</p>



## Contact

Your Name - nwabuokeinnamdi19@gmail.com

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

# The Project is Structured with Clean Architecture

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>
<br />
<br />

<!-- ABOUT THE SERVICE -->

## About The Service

This service manages everything that has to with authentication, authorization, roles, permissions, referrals

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [Typescript](https://www.typescriptlang.org)
- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/atlas/database)
- [Docker](https://www.docker.com)
- [Redis](https://redis.io)
- [Elastic stacks](https://www.elastic.co/elastic-stack/)
- [RabbitMQ](https://www.rabbitmq.com)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

\_Below is an instruction on how to install and set up your app.

#### Normal

1. Clone the repo

   ```sh
   git clone https://github.com/Evea01/evea-auth-service.git
   ```

2. Cd into the directory

   ```sh
   cd evea-auth-service
   ```

3. Install NPM packages and Yarn, in your root directory of the project run the command below

   ```sh
   yarn
   ```

4. Create an .env and copy the template from .env.sample

   ```sh
   touch .env
   ```

5. Copy the value inside .env.sample into the .env and fill the values for the necessary config

6. Make sure your Mongodb and RabbitMQ is running locally

7. Run the application

   ```sh
   yarn run dev
   ```

#### Docker

1. Clone the repo

   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```

2. Cd into the directory

   ```sh
   cd Project-Name
   ```

3. Create an .env

   ```sh
   touch .env
   ```

4. Copy the value inside .env.sample into the .env and fill the values for the necessary config

5. Run the application

   ```sh
   docker build -t docker-username/project-name .
   ```

   ```sh
   docker run -it  -p 30100:30100  docker-username/project-name
   ```

## Usage

For documentation, please refer to the [API Documentation](http://localhost:9000/rest-docs)

<p align="right">(<a href="#top">back to top</a>)</p>

## Scripts

- `yarn build` - Compiles src code into dist
- `yarn start` - Starts the app in production mode
- `npm run dev` - Starts the app in development mode
- `yarn test`: Run tests
- `yarn run lint`: Lint code using ESLint
- `yarn run docs:api` - generates API docs

<p align="right">(<a href="#top">back to top</a>)</p>

Visit [http://localhost:9000/rest-docs](http://localhost:9000/rest-docs) for API documentation

## Contact

Your Name - info@evea.africa

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

# The Project is Structured with Clean Architecture

To learn more about clean architecture, please read this article <https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html>

:warning: DISCLAIMER: This is an opinionated implementation of Clean Architecture. Please feel free to modify it to meet your preference.

## What you get

- Project Structure (adopted from Clean Architecture)
- Dependency Injection
- API Documentation using <https://apidocjs.com/>
- MongoDB setup
- Testing setup
- Continous Integration Github action
- Configured Express server
- Compliance with [12 factor app](https://12factor.net/)
- Process manager

## Project structure

- **app**: App contains the use cases of the system. A use case can contain business logic for accomplishig a specific goal. Similar usecases can be grouped together in directories e.g RegisterUser, VerifyUser can be grouped under "users".
  :warning: NOTE: use-cases should NEVER communicate with any external service such as a database directly. Instead, they should call an interface.
- **config**: Environment specific configurations for the application e.g Database connection options, payment providers, etc. All files created in `config` directory are automatically loaded and exported to
  different application modules.
- **domain**: Domain contains the core business logic. A domain here is the real-world context in which you're attempting to solve a problem using software i.e the business thee app will be used for. An entity can be an object with methods, or it can be a set of data structures and functions that mirror their real life counterparts. Example of entities in the e-commerce domain might be Customer, Product, Cart, etc.
  :warning: NOTE: entities should NEVER communicate with any external service such as a database directly.
- **infastructure**: Infastructure contains the logics to commuicate with all third party assisting application
- **interface**: Inerface contains everything has to do with the Application Entry and route handlers
- **interfaces**: Interfaces are delivery mechanisms for your app i.e how users access your app. For example, through a REST API, gRPC server, GraphQL. In this example, we are delivering our application using Express web framework for Nodejs.
- **scripts**: One time scripts go here. Read <https://12factor.net/admin-processes> to learn more


## Requests and Response

### Fetch all Cached projects
Request
```js
curl --location --request GET 'http://localhost:30200/v1/project/fame' \
--data-raw ''
```

Response

```js
{
    "success": true,
    "status_code": 200,
    "message": "success",
    "data": [
        {
            "name": "fame",
            "description": "Non quibusdam labore reiciendis odit soluta et minus.\nDolor qui ea dolores consequatur qui eos natus quo.\nAsperiores nihil quia id reprehenderit.",
            "id": "5152201653"
        }
    ],
    "links": null
}
```

### Fetch Cached project by Id
Request
```js
curl --location --request GET 'http://localhost:30200/v1/project/fame/9117677429' \
--data-raw ''
```

Response

```js
{
    "success": true,
    "status_code": 200,
    "message": "success",
    "data": {
        "name": "fame",
        "description": "Non quibusdam labore reiciendis odit soluta et minus.\nDolor qui ea dolores consequatur qui eos natus quo.\nAsperiores nihil quia id reprehenderit.",
        "id": "5152201653"
    },
    "links": null
}
```

### Save project
Request
```js
curl --location --request POST 'http://localhost:30200/v1/project' \
--header 'Content-Type: application/json' \
--data-raw '{
 "name": "power",
 "description": "davidbowo1234567891356@yopmail.com"

}'
```

Response

```js
{
    "success": true,
    "status_code": 201,
    "message": "Project created successfully",
    "data": {
        "name": "power",
        "description": "davidbowo1234567891356@yopmail.com",
        "id": "9546627394"
    },
    "links": null
}
```

### Delete Cached project
Request
```js
curl --location --request DELETE 'http://localhost:30200/v1/project/9117677429' \
--data-raw ''
```

Response

```js
{
    "success": true,
    "status_code": 200,
    "message": "Deleted Successfully",
    "data": null,
    "links": null
}
```

### Update Cached projects
Request
```js
curl --location --request PUT 'http://localhost:30200/v1/project/update/3779117192' \
--header 'Content-Type: application/json' \
--data-raw '{
 "name": "project",
 "description": "Peter Parker sold a stew of little pepper "

}'
```

Response

```js

  {
    "success": true,
    "status_code": 200,
    "message": "Updated Successfully",
    "data": {
        "name": "project",
        "description": "Peter Parker sold a stew of little pepper ",
        "id": "3779117192"
    },
    "links": null
}
```

### Delete all Cached projects
Request
```js
curl --location --request DELETE 'http://localhost:30200/v1/project' \
--header 'Content-Type: application/json' \
--data-raw '{
 "name": "Power"

}'
```

Response

```js
{
    "success": true,
    "status_code": 200,
    "message": "Deleted all Successfully",
    "data": null,
    "links": null
}
```

