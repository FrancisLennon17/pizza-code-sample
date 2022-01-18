import { Schema } from 'express-validator';

const sizes = ['small', 'medium', 'large'];

export const createOrderValidator: Schema = {
  'orderItems': {
    in: 'body',
    custom: {
      options: (value: unknown[]): boolean => {
        return Array.isArray(value) && value.length > 0;
      }
    }
  },
  'orderItems.*.pizzaName': {
    in: 'body',
    custom: {
      options: (value: unknown): boolean => {
        return value != undefined && typeof value === 'string' && value !== '';
      }
    }
  },
  'orderItems.*.size': {
    in: 'body',
    custom: {
      options: (value: unknown): boolean => {
        return value != undefined && typeof value === 'string' && sizes.includes(value);
      }
    }
  }
};

export const getOrderValidator: Schema = {
  id: {
    in: 'params',
    isUUID: true
  }
};
