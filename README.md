# pizza-code-sample
Loosely following the challenge listed here https://github.com/AmbulnzLLC/fullstack-challenge/tree/master/backend

## Included

### API Endpoints
- GET /api/pizzas returns a list of pizzas 
- POST /api/orders creates an order with a given pizza
- GET /api/orders/:id fetches the details of a given order

### Swagger UI
When running the service, the openapi3 spec is hosted locally with swagger ui where you can view the endpoint's arguments and possible responses, as well as test the endpoints without the need to use Curl/Postman/Insomnia etc.

`http://localhost:8000/api-docs/index.html`

### Unit tests
A small number of tests at each layer of the service has been added.

### ORM
TypeORM has been used to interact with postgres. The typeorm entity models have been synced with the database instead of using migration scripts for this example.

## Running the application

### Pre-requisites

1. Install Docker & Docker Compose

### Locally running the application

1. Copy the .env.example file into a new .env file

2. run `docker-compose up` to start the DB

3. run `npm start` to start the service

### Seeding the database

Insert pizzas into the database for testing

```
INSERT INTO public.pizza(
	name, price, ingredients)
	VALUES ('Margherita', 13, ARRAY['tomato', 'mozzarella']);
```