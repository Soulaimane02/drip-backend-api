interface IRepository<T> {
  getAll: () => Promise<T[]>;
  get: (id: string) => Promise<T>;
  add: (item: T) => Promise<T>;
  put: (id: string, item: T) => Promise<T>;
  delete: (id: string) => Promise<void>;
}

export default IRepository;
