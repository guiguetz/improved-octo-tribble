import { GameObject } from './GameObject';
import { Person } from './Person';
import utils from './utils';

const { withGrid, asGridCoord } = utils;

interface OverworldMapConfig {
  gameObjects: { [key: string]: GameObject };
  lowerSrc: string;
  upperSrc: string;
  walls?: any;
}

export class OverworldMap {
  gameObjects: { [key: string]: GameObject };
  lowerImage: HTMLImageElement;
  upperImage: HTMLImageElement;
  walls;

  constructor(config: OverworldMapConfig) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLowerImage(ctx: CanvasRenderingContext2D, camera: GameObject) {
    ctx.drawImage(
      this.lowerImage,
      withGrid(10.5) - camera.x,
      withGrid(6) - camera.y
    );
  }
  drawUpperImage(ctx: CanvasRenderingContext2D, camera: GameObject) {
    ctx.drawImage(
      this.upperImage,
      withGrid(10.5) - camera.x,
      withGrid(6) - camera.y
    );
  }

  isSpaceTaken(currentX: number, currentY: number, direction: string) {
    const { x, y } = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.values(this.gameObjects).forEach((o) => o.mount(this));
  }

  addWall(x: number, y: number) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x: number, y: number) {
    delete this.walls[`${x},${y}`];
  }
  moveWall(wasX: number, wasY: number, direction: string) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

export const OverworldMaps = {
  DemoRoom: {
    lowerSrc: '/images/maps/DemoLower.png',
    upperSrc: '/images/maps/DemoUpper.png',
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
        src: '/images/characters/people/hero.png',
      }),
      npc1: new Person({
        isPlayerControlled: false,
        x: utils.withGrid(7),
        y: utils.withGrid(9),
        src: '/images/characters/people/npc1.png',
      }),
    },
    walls: {
      //"16,16": true
      [asGridCoord(7, 6)]: true,
      [asGridCoord(8, 6)]: true,
      [asGridCoord(7, 7)]: true,
      [asGridCoord(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: '/images/maps/KitchenLower.png',
    upperSrc: '/images/maps/KitchenUpper.png',
    gameObjects: {
      hero: new Person({
        x: 3,
        y: 6,
        src: '/images/characters/people/hero.png',
        isPlayerControlled: true,
      }),
      npc1: new Person({
        x: 10,
        y: 6,
        src: '/images/characters/people/npc5.png',
        isPlayerControlled: false,
      }),
    },
    walls: {},
  },
  Street: {},
};
