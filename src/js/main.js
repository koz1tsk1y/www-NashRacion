
import '../scss/style.scss'

import { headerInit } from './_header.js';
import { upBtnInit } from './_up-btn.js';
import { cardsInit } from './_cards.js';
import { customNumberInit } from './_custom-number.js';
import { customSelectInit } from './_custom-select.js';
import { quizInit } from './_quiz.js';

document.addEventListener( 'DOMContentLoaded', function() {
  headerInit();
  upBtnInit();
  cardsInit();
  customNumberInit();
  customSelectInit();
  quizInit();
})