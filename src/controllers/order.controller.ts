require('express-async-errors');
import { Request, Response } from 'express';
import http from 'http-status-codes';
import { IOrderService } from '../services/interfaces';

class OrderController {
  private orderService: IOrderService;

  constructor(orderService: IOrderService) {
    this.orderService = orderService;
  }

  /**
   * 
   * POST /api/orders
   *
   */
  async createOrder(request: Request, response: Response): Promise<Response> {
    const orderId = await this.orderService.createOrder(request.body);
    return response.status(http.OK).json({orderId});
  }

  /**
   * 
   * GET /api/orders/:id
   *
   */
   async getOrderById(request: Request, response: Response): Promise<Response> {
    const order = await this.orderService.getOrderById(request.params.id);
    return response.status(http.OK).json({order});
  }
}

export default OrderController;