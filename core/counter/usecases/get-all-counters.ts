import { Usecase } from "~/core/base/usecase.interface";
import { Counter } from "../entities/counter.entity";
import { CounterRepository } from "../counter-repository.interface";

export abstract class GetAllCounterUsecase implements Usecase<Counter[]> {
  abstract execute(): Counter[];
}

export class GetAllCounterUsecaseImpl implements GetAllCounterUsecase {
  constructor(private counterRepository: CounterRepository) {}

  execute(): Counter[] {
    return this.counterRepository.getAllCounters();
  }
}
