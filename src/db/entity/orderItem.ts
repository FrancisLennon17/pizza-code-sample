import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order } from './order';
import { Pizza } from './pizza';

@Entity()
export class OrderItem {

  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @ManyToOne(_type => Pizza)
  pizza: Pizza;

  @Column()
  pizzaId: string;

  @Column('text')
  size: string;

  @ManyToOne(_type => Order, order => order.orderItems)
  order: Order;
}
