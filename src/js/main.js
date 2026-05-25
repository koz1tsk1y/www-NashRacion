
import '../scss/style.scss'

import { headerInit } from './_header.js';
import { upBtnInit } from './_up-btn.js';
import { cardsInit } from './_cards.js';
import { customNumberInit } from './_custom-number.js';
import { customSelectInit } from './_custom-select.js';
import { quizInit } from './_quiz.js';
import { previewSliderInit } from './_preview-slider.js';
import { faqInit } from './_faq.js';
import { customUploadInit } from './_custom-upload.js';
import { feedbackPopupInit } from './_feedback-popup.js';

document.addEventListener( 'DOMContentLoaded', function() {
  headerInit();
  upBtnInit();
  cardsInit();
  customNumberInit();
  customSelectInit();
  quizInit();
  previewSliderInit();
  faqInit();
  customUploadInit();
  feedbackPopupInit();
})