interface Repository<T> {
  getAll: () => Promise<T[]>;
  get: (id: string) => Promise<T>;
  add: (item: T) => Promise<T>;
  put: (id: string, item: any) => Promise<T>;
  deleteOne: (id: string) => Promise<void>;
}

export default Repository;
