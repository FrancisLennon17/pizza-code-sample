import httpError from 'http-errors';
import http from 'http-status-codes';

import databaseConnect from '../db';
import { IOrderRepository } from './interfaces';
import { Order } from '../db/entity/order';
import { OrderItem } from '../db/entity/orderItem';

class OrderRepository implements IOrderRepository {
  async createOrder(orderDTO: OrderDTO): Promise<string> {
    const connection = await databaseConnect.get();
    const orderRepo = connection.getRepository(Order);
    const order = new Order();
    order.orderItems = orderDTO.orderItems.map(orderItemDTO => {
      const orderItem = new OrderItem();
      orderItem.order = order;
      if (!orderItemDTO.pizzaId) {
        throw httpError(http.BAD_REQUEST, { message: 'invalid pizza id'});
      }
      orderItem.pizzaId = orderItemDTO.pizzaId,
      orderItem.size = orderItemDTO.size;
      return orderItem;
    });
    const createdOrder = await orderRepo.save(order);
    return createdOrder.id;
  }

  async getOrderById(id: string): Promise<Maybe<OrderDTO>> {
    const connection = await databaseConnect.get();
    const orderRepo = connection.getRepository(Order);
    const order = await orderRepo.findOne({
      where: {
        id
      },
      relations: ['orderItems']
    });
    return order? order.toDTO() : undefined;
  }
}

export default OrderRepository;