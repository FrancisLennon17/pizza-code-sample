import { Entity, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { OrderItem } from './orderItem';

@Entity()
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(_type => OrderItem, orderItem => orderItem.order, { cascade: ['insert', 'update'] })
  orderItems: OrderItem[];

  toDTO(): OrderDTO {
    return {
      id: this.id,
      orderItems: this.orderItems.map(orderItem => {
        return {
          pizzaId: orderItem.pizzaId,
          size: orderItem.size
        };
      })
    };
  }
}
