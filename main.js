import './assets/css/main.scss'

import canvasCore from './assets/js/3d.js'
import cursor from './assets/js/cursor.js'

setTimeout(() => {
  document.querySelector(".scene__one").classList.add("disabled")
  document.querySelector(".scene__one__left").classList.add("first-state")
  //document.querySelector(".scene__one__right").classList.add("first-state")
}, 4000);

canvasCore()
cursor()