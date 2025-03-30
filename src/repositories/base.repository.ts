import { Model, UpdateQuery } from "mongoose";
import IRepository from "./repository";

abstract class BaseRepository<T> implements IRepository<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll(): Promise<T[]> {
    const items = await this.model.find();
    return items.map((item) => item.toObject() as T);
  }

  async get(id: string): Promise<T> {
    const item = await this.model.findById(id);
    if(!item) {
      throw new Error(`${this.model.modelName} not found!`);
    }
    return item.toObject() as T;
  }

  async add(data: T): Promise<T> {
    const created = await new this.model(data).save();
    return created.toObject() as T;
  }

  async put(id: string, data: T): Promise<T> {
    const updated = await this.model.findByIdAndUpdate(id, data as UpdateQuery<T>, { new: true });
    if(!updated) {
      throw new Error(`${this.model.modelName} not found!`);
    }
    return updated.toObject() as T;
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.model.findByIdAndDelete(id);
    if(!deleted) {
      throw new Error(`${this.model.modelName} not found!`);
    }
  }
}

export default BaseRepository;
