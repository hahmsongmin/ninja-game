import { Hero } from './class.js';

export let hero;

export const key = {
  keyDown: {},
  keyValue: {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    KeyX: 'attack',
  },
};

// 이 배열에 모든 수리검 관리
export const bulletComProp = {
  arr: [],
  launch: false,
};

export const gameBackground = {
  gameBox: document.querySelector('.game'),
};

export const gameProp = {
  screenWidth: window.innerWidth,
  screenHight: window.innerHeight,
};

// 이벤트 딜레이 때문에 자연스럽지 못함
// 캐릭터 움직임 자연스럽게 (requestAnimationFrame)
// 60 frame, 재귀호출하면서 상태체크하며 움직임값 변경
const renderGame = () => {
  hero.keyDownMotion();
  setGameBackground();
  bulletComProp.arr.forEach((arr) => {
    arr.moveBullet();
  });
  window.requestAnimationFrame(renderGame);
};

// 페럴럭스 (배경도 계속 이동 필요) , 히어로가 이동한 만큼
const setGameBackground = () => {
  let parallaxValue = Math.min(0, (hero.getHeroMoveX() - gameProp.screenWidth / 3) * -1);
  gameBackground.gameBox.style.transform = `translateX(${parallaxValue}px)`;
};

const init = () => {
  hero = new Hero();
  loadImg();
  windowEvent();
  renderGame();
};

// 모든 콘텐츠(images, script, css, etc)가 로드된 후 실행
window.onload = () => {
  init();
};

const windowEvent = () => {
  window.addEventListener('keydown', (e) => {
    key.keyDown[key.keyValue[e.code]] = true;
  });

  window.addEventListener('keyup', (e) => {
    key.keyDown[key.keyValue[e.code]] = false;
    hero.keyUpMotion();
  });
  window.addEventListener('resize', (e) => {
    gameProp.screenWidth = window.innerWidth;
    gameProp.screenHight = window.innerHeight;
  });
};

// 미리 이미지로드(네트워크에서 확인 가능)
const loadImg = () => {
  const preLoadImgSrc = ['../../lib/images/ninja_attack.png', '../../lib/images/ninja_run.png'];
  preLoadImgSrc.forEach((img) => {
    const image = new Image();
    image.src = img;
  });
};
