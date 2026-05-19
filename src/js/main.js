
import '../scss/style.scss'

import { headerInit } from './_header.js';
import { upBtnInit } from './_up-btn.js';
import { cardsInit } from './_cards.js';

document.addEventListener( 'DOMContentLoaded', function() {
  headerInit();
  upBtnInit();
  cardsInit();
})