type Maybe<T> = T | void;
type PizzaDTO = {
  id?: string,
  name: string,
  price: string,
  ingredients: string[]
}

type OrderItemDTO = {
  pizzaName?: string,
  pizzaId?: string,
  size: string
}

type OrderDTO = {
  id?: string,
  orderItems: OrderItemDTO[]
}

