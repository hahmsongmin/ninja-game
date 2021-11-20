import { hero, key, gameProp, bulletComProp } from './game.js';

export class Hero {
  constructor() {
    this.element = document.querySelector('.hero');
    this.moveX = 0;
    this.speed = 16;
    this.direction = 'right';
  }

  getHeroDirection() {
    return this.direction;
  }

  getHeroMoveX() {
    return this.moveX;
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
  Postion() {
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
      this.direction = key.keyValue['ArrowRight'];
      this.handleMove();
    } else if (key.keyDown['left']) {
      this.handleClass();
      this.element.classList.add('flip');
      this.moveX = this.moveX - this.speed;
      this.direction = key.keyValue['ArrowLeft'];
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

class Bullet extends Hero {
  constructor() {
    super();
    this.parentNode = document.querySelector('.game');
    this.element = document.createElement('div');
    this.element.className = 'hero_bullet';
    this.x = 0;
    this.y = 0;
    this.moveX = 0;
    this.speed = 30;
    this.bulletDirection = 'right';
    this.init();
  }
  init() {
    this.bulletDirection = hero.getHeroDirection() === 'left' ? 'left' : 'right';
    this.x = hero.getHeroMoveX() + hero.size().width / 2;
    this.y = (hero.Postion().bottom - hero.size().height) / 2;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    this.parentNode.appendChild(this.element);
    this.moveX = this.x;
  }
  moveBullet() {
    let setRotate = '';
    if (this.bulletDirection === 'left') {
      this.moveX -= this.speed;
      setRotate = `rotate(180deg)`;
    } else {
      this.moveX += this.speed;
    }
    this.element.style.transform = `translate(${this.moveX}px, ${this.y}px) ${setRotate}`;
    this.crashBullet();
  }

  crashBullet() {
    const position = super.Postion();
    if (position.left > gameProp.screenWidth || position.right < 0) {
      this.element.remove();
    }
  }
}
