import { LocalStorageService } from "~/data";

export class LocalStorageServiceImpl implements LocalStorageService {
  get(key: string): string {
    if (!process.client)
      throw new Error("This Function should only called on client side");

    const item = localStorage.getItem(key);

    if (item == null)
      throw new Error(`Count not find item in LocalStorage with key: ${key}`);

    return item;
  }

  set(key: string, value: string): void {
    if (!process.client)
      throw new Error("This Function should only called on client side");

    localStorage.setItem(key, value);
  }
}
