/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */

const mockCreateOrder = jest.fn();
jest.mock('../../repositories/order.repository', () => {
  return jest.fn().mockImplementation(() => {
    return {
      createOrder: mockCreateOrder
    };
  });
});

const mockGetPizzaByName = jest.fn();
const mockGetPizzaById = jest.fn();
jest.mock('../pizza.service', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getPizzaByName: mockGetPizzaByName,
      getPizzaById: mockGetPizzaById
    };
  });
});

jest.mock('../pizza.service');

const OrderRepository = require('../../repositories/order.repository');
const PizzaService = require('../pizza.service');
import OrderService from '../order.service';

describe('OrderRepository tests', () => {
  const pizza = {
    id: '5a2f8522-49fd-452b-a413-8c6697ded624',
    name: 'Margherita',
    price: 12,
    ingredients: ['tomato', 'mozzarella']
  };

  const order = {
    orderItems: [{
      pizzaId: '5a2f8522-49fd-452b-a413-8c6697ded624',
      pizzaName: 'Margherita',
      size: 'medium'
    }]
  };
  const orderId = 'e8651d78-ebae-4b09-b5d8-0427b2b87d1e';
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    let orderService: OrderService;
    beforeEach(() => {
      orderService = new OrderService(new OrderRepository, new PizzaService());
    });

    describe('happy path', () => {
      let result: string;
      let err: any;
      beforeEach(async () => {
        mockGetPizzaByName.mockImplementation(() => {
          return pizza;
        });
        mockCreateOrder.mockImplementation(() => {
          return orderId;
        });
        try {
          result = await orderService.createOrder(order);
        } catch (e) {
          err = e;
        }
      });

      it('does not error', () => {
        expect(err).toBe(undefined);
      });

      it('calls the pizzaService.getPizzaByName function', () => {
        expect(mockGetPizzaByName).toHaveBeenCalledTimes(1);
      });

      it('calls the pizzaService.getPizzaByName function with expected args', () => {
        expect(mockGetPizzaByName).toHaveBeenLastCalledWith(order.orderItems[0].pizzaName);
      });

      it('calls the repository.save function', () => {
        expect(mockCreateOrder).toHaveBeenCalledTimes(1);
      });

      it('returns expected response', () => {
        expect(result).toEqual(orderId);
      });
    });

    describe('could not find pizza', () => {
      let err: any;
      beforeEach(async () => {
        try {
          mockGetPizzaByName.mockImplementation(() => {
            return undefined;
          });
          await orderService.createOrder(order);
        } catch (e) {
          err = e;
        }
      });

      it('calls the pizzaService.getPizzaByName function', () => {
        expect(mockGetPizzaByName).toHaveBeenCalledTimes(1);
      });

      it('calls the pizzaService.getPizzaByName function with expected args', () => {
        expect(mockGetPizzaByName).toHaveBeenLastCalledWith('Margherita');
      });

      it('does not call the repository.save function', () => {
        expect(mockCreateOrder).toHaveBeenCalledTimes(0);
      });

      it('returns expected error status', () => {
        expect(err.status).toEqual(400);
      });

      it('returns expected error message', () => {
        expect(err.message).toEqual('could not find pizza by name: Margherita');
      });
    });
  });
});