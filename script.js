const langElements = document.querySelectorAll('[data-translate]'),
      form = document.forms.language,
      select = document.forms.language.querySelector('select');
      
let wordsArr = [];  
let valueInLS = '';

select.onchange = function() {
  localStorage.setItem('valueInLS', select.value);
  if (select.value === 'russian') {
    wordsArr = russian;
  } else if (select.value === 'hebrew') { 
    wordsArr = hebrew; 
  } else if (select.value === 'english') {
    location.reload();
  }
  universalTranslate();

}
onload = function() {
  if (localStorage.getItem('valueInLS')) {
    select.value = localStorage.getItem('valueInLS')
  } else {
    localStorage.setItem('valueInLS', select.value);
    valueInLS = select.value;
  }

  if (select.value === 'russian') {
    wordsArr = russian;
    universalTranslate();
  } else if (select.value === 'hebrew') { 
    wordsArr = hebrew; 
    universalTranslate();
  } else if (select.value === 'english') {
    localStorage.clear();
  }
}

const russian = [ 'Домашняя работа',
                  'Выбрать язык:',
                  'Таблица',
                  'Ссылки',
                  'Шашечки',
                  'Список пользователей',
                  'Регистрация',
                ];

const hebrew = [ 'שיעורי בית',
                 'בחר שפה:',
                 'טבלה',
                 'קישורים',
                 'דַמקָה',
                 'רשימת משתמשים',
                 'הַרשָׁמָה',
                ];

function universalTranslate() {
  for (let i = 0; i < langElements.length; i++) {
    langElements[i].textContent = `${wordsArr[i]}`;
  }
}
