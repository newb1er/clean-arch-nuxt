import { Usecase } from "~/core/base/usecase.interface";
import { Counter } from "../entities/counter.entity";
import { CounterRepository } from "../counter-repository.interface";

export abstract class CounterDecreaseUsecase implements Usecase<Counter> {
  abstract execute(counter: Counter): Counter;
}

export class CounterDecreaseUsecaseImpl implements Usecase<Counter> {
  constructor(private counterRepository: CounterRepository) {}

  execute(counter: Counter): Counter {
    const newCounter: Counter = {
      ...counter,
      currentCount: counter.currentCount - counter.decrementAmount,
    };

    this.counterRepository.updateCounter(counter.id, newCounter);

    return newCounter;
  }
}
