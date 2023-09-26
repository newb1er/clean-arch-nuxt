import { Usecase } from "~/core/base/usecase.interface";
import { Counter } from "../entities/counter.entity";
import { CounterRepository } from "../counter-repository.interface";

export abstract class CounterIncreaseUsecase implements Usecase<Counter> {
  abstract execute(counter: Counter): Counter;
}

export class CounterIncreaseUsecaseImpl implements CounterIncreaseUsecase {
  constructor(private counterRepository: CounterRepository) {}

  execute(counter: Counter): Counter {
    const newCounter: Counter = {
      ...counter,
      currentCount: counter.currentCount + counter.incrementAmount,
    };

    this.counterRepository.updateCounter(counter.id, newCounter);

    return newCounter;
  }
}
