import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pizza {

  @PrimaryGeneratedColumn('uuid')
  id: string; 

  @Column('text')
  name: string;

  @Column('int')
  price: string;

  @Column('text', { array: true })
  ingredients: string[];

  toDTO(): PizzaDTO {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      ingredients: this.ingredients
    };
  }
}
