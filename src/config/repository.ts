interface Repository<T, S> {
  getAll: () => Promise<S[]>;
  get: (id: string) => Promise<S>;
  add: (item: T) => Promise<S>;
  put: (id: string, item: T) => Promise<S>;
  delete: (id: string) => Promise<void>;
}

export default Repository;
