export interface IPizzaService {
  getPizzas: () => Promise<PizzaDTO[]>
  getPizzaByName: (name: string) => Promise<Maybe<PizzaDTO>>
  getPizzaById: (id: string) => Promise<Maybe<PizzaDTO>>
}

export interface IOrderService {
  createOrder: (order: OrderDTO) => Promise<string>
  getOrderById: (id: string) => Promise<Maybe<OrderDTO>>
}