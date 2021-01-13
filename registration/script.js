var inputRightValues = document.querySelector('.right-values');

inputRightValues.onclick = function() {
  var emailInput = document.querySelector('#email-id'),
      passwInput = document.querySelector('#password-id');

  emailInput.value = 'eve.holt@reqres.in';
  passwInput.value = 'pistol';
};
//-------------------------------------------------------------------------------------------------
var form = document.getElementsByName('registration')[0],
    button = document.getElementsByTagName('button')[0],
    lsUserId = '',
    divResult = document.createElement('div');
    divResult.classList.add('result', 'display-none');
    
  document.addEventListener("DOMContentLoaded", checkLS);
  form.addEventListener('submit', sendAuthRequest); 

function sendAuthRequest(e) {
  e.preventDefault();
  var password = document.getElementById('password-id'),
      email = document.getElementById('email-id');

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://reqres.in/api/register');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    "email": email.value,
    "password": password.value
  }));
  xhr.onload = function() {
  	var statusType = +String(this.status)[0];
    try {
      if (statusType !== 2) {
      throw { name: 'Error', message: JSON.parse(this.response).error };
      };
    } catch (error) {
      showMessage(error.message);
      clearInputs();
    }
  	if (statusType === 2) {
  		try {
        if (!localStorage.getItem('lsUserId')) {
          localStorage.setItem('lsUserId', JSON.parse(this.response).id);
          form.classList.add('display-none');
          showMessage('User ' + localStorage.getItem('lsUserId') + ' has been successfully registered');
        } else {
          form.classList.add('display-none');
          showMessage('User ' + localStorage.getItem('lsUserId') + ' has already been registered');
        };
  		} catch(error) {
  			console.log(error.name + ' - ' + error.message);
	  	};
  	};
  };
  xhr.onerror = function() {
    try {
      var statusType = +String(this.status)[0];
      console.log(statusType);
      if (statusType === 0) {
        throw { name: 'DNS Error', message: 'there is something wrong with the address' };
      };
    } catch (error) { 
      showMessage(error.message);
    };
  };
};

function showMessage(str) {
  divResult.innerHTML = str;
  divResult.classList.remove('display-none');
  document.body.appendChild(divResult);
};

function checkLS() {
  if (localStorage.getItem('lsUserId')) {
    form.classList.add('display-none');
          showMessage('User ' + localStorage.getItem('lsUserId') + ' has already been registered');
  };
};

function clearInputs() {
  var passwordInput = document.getElementById('password-id'),
      emailInput = document.getElementById('email-id');
  
      passwordInput.value = '';
      passwordInput.classList.add('alarm');
      emailInput.value = '';
      emailInput.classList.add('alarm');
};