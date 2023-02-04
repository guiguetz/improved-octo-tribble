import { GameObject } from './GameObject';

import util from './utils';
const { withGrid } = util;

interface SpriteConfig {
  animations?: object;
  animationFrameLimit?: number;
  currentAnimation?: string;
  useShadow?: boolean;
  gameObject: any;
  src: string;
}

export class Sprite {
  private _animations: any;
  private _currentAnimation: any;
  private _currentAnimationFrame: any;

  private _image: HTMLImageElement;
  private _isLoaded: boolean;

  private _useShadow: boolean;
  private _shadow: HTMLImageElement;
  private _isShadowLoaded: boolean;

  private _gameObject: GameObject;
  animationFrameLimit: number;
  animationFrameProgress: number;

  get frame() {
    return this._animations[this._currentAnimation][
      this._currentAnimationFrame
    ];
  }

  constructor(config: SpriteConfig) {
    this._image = new Image();
    this._image.src = config.src;
    this._image.onload = () => {
      this._isLoaded = true;
    };

    this._shadow = new Image();
    this._useShadow = config.useShadow || true;
    this._shadow.onload = () => {
      this._isShadowLoaded = true;
    };
    this._shadow.src = '/images/characters/shadow.png';

    this._animations = config.animations || {
      'idle-up': [[0, 2]],
      'idle-down': [[0, 0]],
      'idle-left': [[0, 3]],
      'idle-right': [[0, 1]],
      'walk-up': [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      'walk-down': [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      'walk-left': [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
      'walk-right': [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
    };
    this._currentAnimation = 'idle-down'; //config.currentAnimation || 'idle-down';
    this._currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    this._gameObject = config.gameObject;
  }

  draw(ctx: CanvasRenderingContext2D, camera: GameObject) {
    const x = this._gameObject.x - 8 + withGrid(10.5) - camera.x;
    const y = this._gameObject.y - 18 + withGrid(6) - camera.y;
    this._useShadow &&
      this._isShadowLoaded &&
      ctx.drawImage(this._shadow, x, y);
    const [frameX, frameY] = this.frame;
    this._isLoaded &&
      ctx.drawImage(
        this._image,
        frameX * 32,
        frameY * 32,
        32,
        32,
        x,
        y,
        32,
        32
      );
    this.updateAnimationProgress();
  }

  updateAnimationProgress() {
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    this.animationFrameProgress = this.animationFrameLimit;
    this._currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this._currentAnimationFrame = 0;
    }
  }

  setAnimation(key: string) {
    if (this._currentAnimation !== key) {
      this._currentAnimation = key;
      this._currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }
}
