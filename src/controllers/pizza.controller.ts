require('express-async-errors');
import { Request, Response } from 'express';
import http from 'http-status-codes';
import { IPizzaService } from '../services/interfaces';

class PizzaController {
  private pizzaService: IPizzaService;

  constructor(pizzaService: IPizzaService) {
    this.pizzaService = pizzaService;
  }


  /**
   * 
   * /api/pizzas
   *
   */
  async getPizzas(_: Request, response: Response): Promise<Response> {
    const pizzas = await this.pizzaService.getPizzas();
    return response.status(http.OK).json({ pizzas });
  }
}

export default PizzaController;