import { Counter } from "./entities/counter.entity";

export abstract class CounterRepository {
  abstract createCounter(counterInfo: Counter): Counter;
  abstract updateCounter(counterId: string, counterInfo: Counter): Counter;
  abstract getAllCounters(): Counter[];
}
