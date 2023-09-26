import { Counter, CounterRepository } from "../core";
import { LocalStorageService } from "./common/local-storage.interface";

export class CounterRepositoryImpl implements CounterRepository {
  counterIdsStorageId = "counter-ids";

  constructor(private localStorageService: LocalStorageService) {}

  get counterIds(): string[] {
    try {
      const counterIds = JSON.parse(
        this.localStorageService.get(this.counterIdsStorageId)
      );

      if (counterIds === null) return [];

      return counterIds.ids;
    } catch {
      return [];
    }
  }

  set counterIds(ids: string[]) {
    this.localStorageService.set(
      this.counterIdsStorageId,
      JSON.stringify({ ids })
    );
  }

  createCounter(counterInfo: Counter): Counter {
    this.localStorageService.set(counterInfo.id, JSON.stringify(counterInfo));

    this.addCounterId(counterInfo.id);

    return counterInfo;
  }

  updateCounter(counterId: string, counterInfo: Counter): Counter {
    this.localStorageService.set(counterId, JSON.stringify(counterInfo));

    return counterInfo;
  }

  getAllCounters(): Counter[] {
    return this.counterIds.map((id) => this.getCounterById(id));
  }

  private addCounterId(counterId: string): void {
    this.counterIds = [...this.counterIds, counterId];
  }

  private getCounterById(counterId: string): Counter {
    return JSON.parse(this.localStorageService.get(counterId));
  }
}
