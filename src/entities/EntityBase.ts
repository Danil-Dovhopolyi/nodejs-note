export abstract class EntityBase {
  id: number;
  createdAt: Date;

  constructor() {
    this.id = 0;
    this.createdAt = new Date();
  }
}
