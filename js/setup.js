'use strict';

var NUMBER_OF_WIZARDS = 4;
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_WRAP_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

var similarWizardsList = userDialog.querySelector('.setup-similar-list');

// ф-ция, определяющая рандомное значение в заданном диапазоне чисел
var getRandomNumber = function (min, max) {
  return min + Math.random() * (max - min);
};

// функция, возвращающая рандомный индекс массива
var getRandomIndex = function (array) {
  return Math.round(getRandomNumber(0, (array.length - 1)));
};

// ф-ция генерации массива 4 объектов-волшебников
var generateWizardsArray = function () {
  var wizards = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizards.push({name: WIZARDS_NAMES[Math.round(getRandomNumber(0, WIZARDS_NAMES.length - 1))] + ' ' + WIZARDS_SURNAMES[Math.round(getRandomNumber(0, WIZARDS_SURNAMES.length - 1))],
      coatColor: COATS_COLORS[Math.round(getRandomNumber(0, COATS_COLORS.length - 1))],
      eyesColor: EYES_COLORS[Math.round(getRandomNumber(0, EYES_COLORS.length - 1))]});
  }
  return wizards;
};

// поиск нужного блока шаблона в разметке
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// ф-ция отрисовки элемента волшебника на основе шаблона
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// создаем массив из 4 сгенерированных объектов-волшебников вызовом соответсвующей ф-цией
var wizardsArray = generateWizardsArray();

// создаем Document Fragment для вставки элементов в разметку
var documentFragment = document.createDocumentFragment();
for (var i = 0; i < wizardsArray.length; i++) {
  documentFragment.appendChild(renderWizard(wizardsArray[i]));
}

similarWizardsList.appendChild(documentFragment);

// убираем класс .hidden у блока похожих волшебников
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');

var setupUserName = document.querySelector('.setup-user-name');

var setupWizard = document.querySelector('.setup-wizard');
var wizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupFireballWrap = document.querySelector('.setup-fireball-wrap');

var setupWizardInput = document.querySelector('.setup-player').querySelectorAll('input');

// ф-ция-обработчик, которая закрывает окно настройки по нажатию на esc (и не закрывает, если инпут ввода имени в фокусе)
var onPopupEscPress = function (evt) {
  if (setupUserName === document.activeElement) {
    evt.stopPropagation();
  } else if (evt.keyCode === ESC_KEYCODE) {
    onSetupCloseClick();
  }
};

// ф-ция, открывающая попап (добавляется обработчик onPopupEscPress)
var onSetupOpenClick = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  setupFireballWrap.addEventListener('click', onSetupFireballWrapClick);
};

// ф-ция, открывающая попап (удаляется обработчик onPopupEscPress)
var onSetupCloseClick = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  setupFireballWrap.removeEventListener('click', onSetupFireballWrapClick);
};

// ф-ция - обработчик, меняющая цвет глаз волшебника при клике (синхронизирует данные скрытого инпута)
var onWizardEyesClick = function () {
  var randomEyesColorElement = WIZARD_EYES_COLORS[getRandomIndex(WIZARD_EYES_COLORS)];
  wizardEyes.style.fill = randomEyesColorElement;
  setupWizardInput[1].value = randomEyesColorElement;
};

// ф-ция - обработчик, меняющая цвет фаербола при клике (синхронизирует данные скрытого инпута)
var onSetupFireballWrapClick = function () {
  var randomFireballWrapElement = FIREBALL_WRAP_COLORS[getRandomIndex(FIREBALL_WRAP_COLORS)];
  setupFireballWrap.style.background = randomFireballWrapElement;
  setupWizardInput[2].value = randomFireballWrapElement;
};

setupOpen.addEventListener('click', onSetupOpenClick);

setupClose.addEventListener('click', onSetupCloseClick);


setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onSetupOpenClick();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onSetupCloseClick();
  }
});

