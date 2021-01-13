var table = document.getElementsByTagName('table')[0],
    buttonAddRow = document.getElementsByClassName('addRowButton')[0],
    text = '';

table.addEventListener('click', tableClick);
table.addEventListener('blur', tableClickBlur, true);

function tableClick(event) {
  var target = event.target;
  var myInput = document.createElement('input');
  
  if (target.className === 'addRow' ) {
      return;
  };

  if (target.className === 'addRowButton') {
    table.firstElementChild.insertAdjacentHTML('afterbegin', '<tr><td></td><td></td><td></td></tr>');
  };

  if (target.tagName === 'TD') {

    if (target.textContent) {
      text = target.textContent;
    };
    target.textContent = '';

    if (target.firstElementChild) {
      target.firstElementChild.focus();
    } else {
      target.appendChild(myInput).focus();
      target.firstElementChild.value = text;
    };
    text = '';
    target.firstElementChild.addEventListener('keyup', function(e){
      if(e.code === 'Enter') { this.blur() };
    });
  };
};

function tableClickBlur (event) {
  var target = event.target,
      tableCellBlur = target.parentElement;

  if (target.className === 'addRowButton' ) {
    return;
  };

  tableCellBlur.textContent = target.value;
  target.value = '';
};
