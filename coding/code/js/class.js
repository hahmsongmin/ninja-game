import { hero, key, gameProp, bulletComProp } from './game.js';

export class Hero {
  constructor(el) {
    this.element = document.querySelector(el);
    this.moveX = 0;
    this.speed = 16;
  }

  handleClass() {
    this.element.classList.add('run');
  }

  handleMove() {
    this.element.parentNode.style.transform = `translateX(${this.moveX}px)`;
  }

  // 화면 크기에 따른 기준을 잡는게 필요(위 또는 아래로)
  // 아래기준
  // 수리검 위치 잡을때 사용 예정
  heroGetPostion() {
    const position = this.element.getBoundingClientRect();
    return {
      left: position.left,
      right: position.right,
      top: gameProp.screenHight - position.top,
      bottom: gameProp.screenHight - position.top - position.height,
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
      if (!bulletComProp.launch) {
        this.element.classList.add('attack');
        bulletComProp.arr.push(new Bullet());
        bulletComProp.launch = true;
      }
    }
  }

  keyUpMotion() {
    if (!(key.keyDown['left'] && key.keyDown['right'])) {
      this.element.classList.remove('run');
    }
    if (key.keyDown['attack'] === false) {
      this.element.classList.remove('attack');
      bulletComProp.launch = false;
    }
  }

  size() {
    return {
      width: this.element.offsetWidth,
      height: this.element.offsetHeight,
    };
  }
}

class Bullet {
  constructor() {
    this.parentNode = document.querySelector('.game');
    this.element = document.createElement('div');
    this.element.className = 'hero_bullet';
    this.x = 0;
    this.y = 0;
    this.moveX = 0;
    this.speed = 30;
    this.init();
  }
  init() {
    this.x = hero.heroGetPostion().left + hero.size().width;
    this.y = (hero.heroGetPostion().bottom - hero.size().height) / 2;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.parentNode.appendChild(this.element);
    this.moveX = this.x;
  }
  moveBullet() {
    this.moveX += this.speed;
    if (gameProp.screenWidth < this.moveX) {
      return;
    }
    this.element.style.transform = `translate(${this.moveX}px, ${this.y}px)`;
  }
}
