import { IPizzaRepository } from '../repositories/interfaces';
import { IPizzaService } from './interfaces';

class PizzaService implements IPizzaService {
  private repository: IPizzaRepository;
  constructor(pizzaRepository: IPizzaRepository) {
    this.repository = pizzaRepository;
  }
  async getPizzas(): Promise<PizzaDTO[]> {
      return this.repository.getPizzas();
  }
  async getPizzaByName(name: string): Promise<Maybe<PizzaDTO>> {
    return this.repository.getPizzaByName(name);
  }
  async getPizzaById(id: string): Promise<Maybe<PizzaDTO>> {
    return this.repository.getPizzaById(id);
  }
}

export default PizzaService;