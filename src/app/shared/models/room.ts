import {Point} from './point';

export class Room {
  id: number;
  name: string;
  points: Point[];

  constructor() {
    this.points = [new Point(), new Point(), new Point(), new Point()];
  }
}
