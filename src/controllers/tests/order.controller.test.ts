/* eslint @typescript-eslint/no-explicit-any: 0 */
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';

jest.mock('../pizza.controller');

const mockCreateOrder = jest.fn();
const mockGetOrderById = jest.fn();

jest.mock('../../services/order.service', () => {
  return jest.fn().mockImplementation(() => {
    return {
      createOrder: mockCreateOrder,
      getOrderById: mockGetOrderById
    };
  });
});

import buildRouter from '../../router/routes';
import errorHandler from '../../router/middleware/error-handler';

const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use('/api', buildRouter())
  .use(errorHandler);

describe('order controller tests', () => {
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
  describe('create order', () => {
    describe('happy path', () => {
      let result: any;
      beforeEach(async () => {
        mockCreateOrder.mockImplementation(() => {
          return orderId;
        });
        result = await request(app)
          .post('/api/orders')
          .send(order);
      });

      it('makes service call to createOrder', () => {
        expect(mockCreateOrder).toHaveBeenCalledTimes(1);
      });
  
      it('calls createOrder with appropriate args', () => {
        expect(mockCreateOrder).toHaveBeenCalledWith(order);
      });

      it('returns status 200', () => {
        expect(result.status).toEqual(200);
      });

      it('returns appropriate body', () => {
        expect(JSON.parse(result.text)).toEqual({
          orderId
        });
      });
    });

    describe('validation error', () => {
      let result: any;
      beforeEach(async () => {
        mockCreateOrder.mockImplementation(() => {
          return orderId;
        });
        result = await request(app)
          .post('/api/orders')
          .send({ orderItems: [123]});
      });

      it('does not makes service call to createOrder', () => {
        expect(mockCreateOrder).toHaveBeenCalledTimes(0);
      });


      it('returns status 400', () => {
        expect(result.status).toEqual(400);
      });

      it('returns appropriate body', () => {
        expect(JSON.parse(result.text)).toEqual({
          error: {
            code: 400,
            message: 'Bad Request',
            details: [
              {
                location: 'body',
                msg: 'Invalid value',
                param: 'orderItems[0].pizzaName',
              },
              {
                location: 'body',
                msg: 'Invalid value',
                param: 'orderItems[0].size',
              }
            ]
          }
        });
      });
    });
  });
});