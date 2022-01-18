import express from 'express';
import { checkSchema } from 'express-validator';

import PizzaController from '../controllers/pizza.controller';
import OrderController from '../controllers/order.controller';

import PizzaService from '../services/pizza.service';
import OrderService from '../services/order.service';

import PizzaRepository from '../repositories/pizza.repository';
import OrderRepository from '../repositories/order.repository';

import { isValidSchema, createOrderValidator, getOrderValidator } from '../controllers/validators';


const buildRouter = (): express.Router => {
  const router = express.Router();

  const pizzaRepository = new PizzaRepository();
  const orderRepository = new OrderRepository();

  const pizzaService = new PizzaService(pizzaRepository);
  const orderService = new OrderService(orderRepository, pizzaService);

  const pizzaController = new PizzaController(pizzaService);
  const orderController = new OrderController(orderService);

/**
 * @swagger
 * /api/pizzas:
 *   get:
 *     summary: fetches the list of pizzas
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pizzas:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 881055eb-bab6-4e96-865a-1e3d6e742f4
 *                       name:
 *                         type: string
 *                         example: Margherita
 *                       price:
 *                         type: number
 *                         example: 12
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: tomato, mozzarella
 *  
 */
  router.get('/pizzas', pizzaController.getPizzas.bind(pizzaController));

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Creates an order
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     pizzaName:
 *                       type: string
 *                       example: Margherita 
 *                     size:
 *                       type: string
 *                       example: medium
 *                       enum: [small, medium, large]
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: string
 *                   example: 881055eb-bab6-4e96-865a-1e3d6e742f4a
 */
  router.post('/orders', 
  checkSchema(createOrderValidator),
  isValidSchema, 
  orderController.createOrder.bind(orderController));

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: fetches the list of pizzas
 *     parameters:
 *     - name: id
 *       in: path
 *       schema:
 *         type: string
 *         example: 881055eb-bab6-4e96-865a-1e3d6e742f4a
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 881055eb-bab6-4e96-865a-1e3d6e742f4
 *                     orderItems:
 *                       type: object
 *                       properties:
 *                         pizzaId:
 *                           type: string
 *                           example: 881055eb-bab6-4e96-865a-1e3d6e742f4
 *                         size:
 *                           type: string
 *                           example: medium
 *                           enum: [small, medium, large]
 *                         pizzaName:
 *                           type: string
 *                           example: Margherita
 *  
 */
  router.get('/orders/:id', 
  checkSchema(getOrderValidator),
  isValidSchema, 
  orderController.getOrderById.bind(orderController));

  return router;
};

export default buildRouter;