import httpError from 'http-errors';
import http from 'http-status-codes';
import { IOrderRepository } from '../repositories/interfaces';
import { IPizzaService, IOrderService } from './interfaces';

class OrderService implements IOrderService {
  private repository: IOrderRepository;
  private pizzaService: IPizzaService;

  constructor(orderRepository: IOrderService, pizzaService: IPizzaService) {
    this.repository = orderRepository;
    this.pizzaService = pizzaService;
  }
  async createOrder(order: OrderDTO): Promise<string> {
    const pizzaIdmap: Record<string, string> = {};
    for (const orderItem of order.orderItems) {
      const pizzaName = orderItem.pizzaName as string;
      if (pizzaIdmap[pizzaName]){
        orderItem.pizzaId = pizzaIdmap[pizzaName];
      } else {
        const pizza =  await this.pizzaService.getPizzaByName(pizzaName);
        if (!pizza || !pizza.id) { 
          throw httpError(http.BAD_REQUEST, { message: `could not find pizza by name: ${orderItem.pizzaName}`} );
        }
        orderItem.pizzaId = pizza.id;
        pizzaIdmap[pizza.name] = pizza.id;
      }
    }
    return this.repository.createOrder(order);
  }

  async getOrderById(id: string): Promise<Maybe<OrderDTO>> {
    const order = await this.repository.getOrderById(id);
    if (!order) { 
      return order;
    }
    const pizzaNamemap: Record<string, string> = {};
    for (const orderItem of order.orderItems) {
      const pizzaId = orderItem.pizzaId as string;
      if (pizzaNamemap[pizzaId]){
        orderItem.pizzaName = pizzaNamemap[pizzaId];
      } else {
        const pizza =  await this.pizzaService.getPizzaById(pizzaId);
        if (!pizza || !pizza.name) { 
          throw httpError(http.BAD_REQUEST, { message: `could not find pizza by id: ${orderItem.pizzaId}`} );
        }
        orderItem.pizzaName = pizza.name;
        pizzaNamemap[pizzaId] = pizza.name;
      }
    }
    return order;
  }
}

export default OrderService;