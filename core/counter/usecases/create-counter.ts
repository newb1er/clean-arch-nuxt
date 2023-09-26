import { Usecase } from "~/core/base/usecase.interface";
import { Counter } from "../entities/counter.entity";
import { CounterRepository } from "../counter-repository.interface";

/*
    Create interface first to then implement it make dependency injection much easier.
    Also, it helps us to define in/out data flow.
*/

export abstract class CreateCounterUsecase implements Usecase<Counter> {
  abstract execute(...args: any[]): Counter;
}

export class CreateCounterUsecaseImpl implements CreateCounterUsecase {
  constructor(private counterRepository: CounterRepository) {}

  execute(): Counter {
    return this.counterRepository.createCounter({
      id: Math.random().toString().substring(4),
      currentCount: 0,
      decrementAmount: 1,
      incrementAmount: 1,
      label: "Alpha Counter",
    });
  }
}
