const buttonsMap = [
  {
    id: 'joypad-button-up',
    code: 'ArrowUp',
  },
  {
    id: 'joypad-button-down',
    code: 'ArrowDown',
  },
  {
    id: 'joypad-button-left',
    code: 'ArrowLeft',
  },
  {
    id: 'joypad-button-right',
    code: 'ArrowRight',
  },
];

export class DirectionInput {
  heldDirections: string[];
  map: {
    [code: string]: string;
  };

  constructor() {
    this.heldDirections = [];
    this.map = {
      ArrowUp: 'up',
      KeyW: 'up',
      ArrowDown: 'down',
      KeyS: 'down',
      ArrowLeft: 'left',
      KeyA: 'left',
      ArrowRight: 'right',
      KeyD: 'right',
    };
  }

  get direction() {
    return this.heldDirections[0];
  }

  init() {
    document.addEventListener('keydown', (e) => {
      const dir = this.map[e.code];
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });
    document.addEventListener('keyup', (e) => {
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });

    document.addEventListener('mousedown', (e) => {
      const button = buttonsMap.find(
        (button) => button.id === (e.target as Element).id
      );
      if (button) {
        const dir = this.map[button.code];
        if (dir && this.heldDirections.indexOf(dir) === -1) {
          this.heldDirections.unshift(dir);
        }
      }
    });
    document.addEventListener('mouseup', (e) => {
      const button = buttonsMap.find(
        (button) => button.id === (e.target as Element).id
      );
      if (button) {
        const dir = this.map[button.code];
        const index = this.heldDirections.indexOf(dir);
        if (index > -1) {
          this.heldDirections.splice(index, 1);
        }
      }
    });
  }
}
