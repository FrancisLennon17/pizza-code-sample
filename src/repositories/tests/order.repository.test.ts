/* eslint-disable @typescript-eslint/no-explicit-any */
import OrderRepository from '../order.repository';

const mockFindOne = jest.fn();
const mockSave = jest.fn();
jest.mock('../../db', () => {
  const get = jest.fn(() => {
    return {
      getRepository: () => {
        return {
          findOne: mockFindOne,
          save: mockSave
        };
      }
    };
  });
  return { get };
});

describe('OrderRepository tests', () => {
  const order = {
    orderItems: [{
      pizzaId: '5a2f8522-49fd-452b-a413-8c6697ded624',
      pizzaName: 'Margherita',
      size: 'medium'
    }]
  };

  const brokenOrder = {
    orderItems: [{
      pizzaName: 'Margherita',
      size: 'medium'
    }]
  };
  const orderId = 'e8651d78-ebae-4b09-b5d8-0427b2b87d1e';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createOrder', () => {
    let orderRepository: OrderRepository;
    beforeEach(() => {
      orderRepository = new OrderRepository();
    });

    describe('happy path', () => {
      let err: any;
      let result: string;
      beforeEach(async () => {
        mockSave.mockImplementation(() => {
          return { id: orderId };
        });
        try {
          result = await orderRepository.createOrder(order);
        }catch(e) {
          err = e;
        }
      });

      it('does not error', () => {
        expect(err).toBe(undefined);
      });

      it('calls the entity.save function', () => {
        expect(mockSave).toHaveBeenCalledTimes(1);
      });

      it('returns expected response', () => {
        expect(result).toEqual(orderId);
      });
    });

    describe('invalid order', () => {
      let err: any;
      beforeEach(async () => {
        try {
          await orderRepository.createOrder(brokenOrder);
        }catch(e) {
          err = e;
        }
      });

      it('does not call the entity.save function', () => {
        expect(mockSave).toHaveBeenCalledTimes(0);
      });

      it('returns expected error status', () => {
        expect(err.status).toEqual(400);
      });

      it('returns expected error message', () => {
        expect(err.message).toEqual('invalid pizza id');
      });
    });
  });
});