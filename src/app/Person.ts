import { GameObject, GameObjectConfig } from './GameObject';
import { OverworldMap } from './OverworldMap';

interface PersonConfig extends GameObjectConfig {
  isPlayerControlled: boolean;
}

interface GameObjectState {
  arrow: 'up' | 'down' | 'left' | 'right';
  map: OverworldMap;
}

type DirectionUpdate = {
  [key: string]: [property: 'x' | 'y', amount: number];
};

interface Behavior {
  type: string;
  direction: 'up' | 'down' | 'left' | 'right';
}

export class Person extends GameObject {
  movingProgressRemaining: number;
  directionUpdate: DirectionUpdate;
  arrow: 'up' | 'down' | 'left' | 'right';
  isPlayerControlled: boolean;

  constructor(config: PersonConfig) {
    super(config);
    this.movingProgressRemaining = 0;
    this.isPlayerControlled = config.isPlayerControlled || false;
    this.directionUpdate = {
      up: ['y', -1],
      down: ['y', 1],
      left: ['x', -1],
      right: ['x', 1],
    };
  }

  update(state: GameObjectState) {
    if (this.movingProgressRemaining > 0) {
      this.updatePosition();
    } else {
      if (this.isPlayerControlled && state.arrow) {
        this.startBehavior(state, { type: 'walk', direction: state.arrow });
      }
      this.updateSprite();
    }
  }

  startBehavior(state: GameObjectState, behavior: Behavior) {
    this.direction = behavior.direction;
    if (behavior.type === 'walk') {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) return;
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemaining = 16;
    }
  }

  updatePosition() {
    const [property, change] = this.directionUpdate[this.direction];
    this[property] += change;
    this.movingProgressRemaining -= 1;
  }

  updateSprite() {
    if (this.movingProgressRemaining > 0) {
      this.sprite.setAnimation(`walk-${this.direction}`);
      return;
    }
    this.sprite.setAnimation(`idle-${this.direction}`);
  }
}
