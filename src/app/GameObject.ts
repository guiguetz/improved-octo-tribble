import { OverworldMap } from './OverworldMap';
import { Sprite } from './Sprite';

export interface GameObjectConfig {
  src: string;
  x: number;
  y: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export class GameObject {
  isMounted: boolean;
  x: number;
  y: number;
  sprite: Sprite;
  direction: 'up' | 'down' | 'left' | 'right';

  constructor(config: GameObjectConfig) {
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || 'down';
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || '/images/characters/people/hero.png',
    });
  }

  mount(map: OverworldMap) {
    this.isMounted = true;
    map.addWall(this.x, this.y);
  }

  update({ arrow }: any) {}
}
