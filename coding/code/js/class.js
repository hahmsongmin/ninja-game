import { key, gameProp } from './game.js';

export class Hero {
  constructor(el) {
    this.element = document.querySelector(el);
    this.moveX = 0;
    this.speed = 16;
    this.position = this.element.getBoundingClientRect();
  }

  handleClass() {
    this.element.classList.add('run');
  }

  handleMove() {
    this.element.parentNode.style.transform = `translateX(${this.moveX}px)`;
  }

  // 화면 크기에 따른 기준을 잡는게 필요(위 또는 아래로)
  // 아래기준
  heroGetPostion() {
    return {
      left: this.position.left,
      right: this.position.right,
      top: gameProp.screenHight - this.position.top,
      bottom: gameProp.screenHight - this.position.top - this.position.height,
    };
  }

  keyDownMotion() {
    if (key.keyDown['right']) {
      this.handleClass();
      this.element.classList.remove('flip');
      this.moveX = this.moveX + this.speed;
      this.handleMove();
    } else if (key.keyDown['left']) {
      this.handleClass();
      this.element.classList.add('flip');
      this.moveX = this.moveX - this.speed;
      this.handleMove();
    }
    if (key.keyDown['attack']) {
      this.element.classList.add('attack');
    }
  }

  keyUpMotion() {
    if (!(key.keyDown['left'] && key.keyDown['right'])) {
      this.element.classList.remove('run');
    }
    if (key.keyDown['attack'] === false) {
      this.element.classList.remove('attack');
    }
  }
}
