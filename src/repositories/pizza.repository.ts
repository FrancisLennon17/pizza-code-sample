import httpError from 'http-errors';
import http from 'http-status-codes';

import databaseConnect from '../db';
import { IPizzaRepository } from './interfaces';
import { Pizza } from '../db/entity/pizza';
import logger from '../logger';

class PizzaRepository implements IPizzaRepository {
  async getPizzas(): Promise<PizzaDTO[]> {
    try {
      const connection = await databaseConnect.get();
      const pizzaRepo = connection.getRepository(Pizza);
      const pizzas = await pizzaRepo.find();
      return pizzas.map(pizza => pizza.toDTO());
    } catch (err) {
      logger.error(`error fetching pizzas: ${err}`);
      throw httpError(http.INTERNAL_SERVER_ERROR);
    }
  }

  async getPizzaByName(name: string): Promise<Maybe<PizzaDTO>> {
    const connection = await databaseConnect.get();
    const pizzaRepo = connection.getRepository(Pizza);
    const pizza = await pizzaRepo.findOne({
      where: {
        name
      }
    });
    return pizza? pizza.toDTO() : undefined;
  }

  async getPizzaById(id: string): Promise<Maybe<PizzaDTO>> {
    const connection = await databaseConnect.get();
    const pizzaRepo = connection.getRepository(Pizza);
    const pizza = await pizzaRepo.findOne({
      where: {
        id
      }
    });
    return pizza? pizza.toDTO() : undefined;
  }
}

export default PizzaRepository;