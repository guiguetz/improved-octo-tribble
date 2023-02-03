class Person {
  private _id: string;
  private _x: number;
  private _y: number;

  get id() {
    return `Meu ID é ${this._id}`;
  }

  set id(newValue: string) {
    this._id = newValue;
  }

  get position() {
    return {
      x: this._x,
      y: this._y,
    };
  }

  set position({ x, y }) {
    this._x = x;
    this._y = y;
  }

  constructor(config) {
    this._id = config.id;
    this._x = config.x;
    this._y = config.y;
  }
}

const p = new Person({ id: "my-id-here" });
console.log(p.id);
