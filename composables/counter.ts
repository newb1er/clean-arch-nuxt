import {
  Counter,
  CounterDecreaseUsecaseImpl,
  CounterIncreaseUsecaseImpl,
  CreateCounterUsecaseImpl,
  GetAllCounterUsecaseImpl,
} from "~/core";
import { CounterRepositoryImpl } from "~/data";
import { LocalStorageServiceImpl } from "~/lib/services/local-storage.impl";

type GetAllCounters = () => Counter[];
type CreateCounter = () => Counter;
type CounterIncrease = (counter: Counter) => Counter;
type CounterDecrease = (counter: Counter) => Counter;

type UseCounter = () => [
  CreateCounter,
  GetAllCounters,
  CounterIncrease,
  CounterDecrease
];
export const useCounter: UseCounter = () => {
  const localStorageService = new LocalStorageServiceImpl();
  const counterRepository = new CounterRepositoryImpl(localStorageService);

  const createCounterUseCase = new CreateCounterUsecaseImpl(counterRepository);
  const createCounter: CreateCounter = () => createCounterUseCase.execute();

  const getAllCounterUsecase = new GetAllCounterUsecaseImpl(counterRepository);
  const getAllCounter: GetAllCounters = () => getAllCounterUsecase.execute();

  const counterIncreaseUsecase = new CounterIncreaseUsecaseImpl(
    counterRepository
  );
  const counterIncrease: CounterIncrease = (counter) =>
    counterIncreaseUsecase.execute(counter);

  const counterDecreaseUsecase = new CounterDecreaseUsecaseImpl(
    counterRepository
  );
  const counterDecrease: CounterDecrease = (counter) =>
    counterDecreaseUsecase.execute(counter);

  return [createCounter, getAllCounter, counterIncrease, counterDecrease];
};
