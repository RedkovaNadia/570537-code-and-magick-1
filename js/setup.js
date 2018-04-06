'use strict';

var NUMBER_OF_WIZARDS = 4;
var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COATS_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarWizardsList = userDialog.querySelector('.setup-similar-list');

// ф-ция, определяющая рандомное значение в заданном диапазоне чисел
var getRandomNumber = function (min, max) {
  return min + Math.random() * (max - min);
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

// ф-ция отрисовки волшебника на основе шаблона
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
