var button = document.getElementById('addUsers'),
    userTabs = document.getElementsByClassName('users-tabs')[0],     
    infoBlock = document.getElementsByClassName('info-block')[0],
    usersBlocksString = '',
    avatar = '',
    firstName = '',
    lastName = '',
    key = '',
    localStorageKey = 'localStorageKey';
    result = '';

button.addEventListener('click', addUserFunc);
userTabs.addEventListener('click', updateUserBlock);

function addUserFunc() {

  if (localStorage.getItem('localStorageKey')) {
    key = localStorage.getItem('localStorageKey');
    userTabs.innerHTML = '';
    for (var i = 1; i <= JSON.parse(localStorage.getItem(key)).per_page; i++) {
      userTabs.innerHTML += '<div class="inner-user-tab">User ' + i + '</div>';
    };
    
  avatar = JSON.parse(localStorage.getItem(key)).data[0].avatar;
    firstName = 'first name: ' + JSON.parse(localStorage.getItem(key)).data[0].first_name;
    lastName = 'last name: ' + JSON.parse(localStorage.getItem(key)).data[0].last_name;
    result = '';
    result = '<div class="avatar"><img src="' + avatar + '"></div><div class="names-info"><div class="first-name-info">'
    + firstName + '</div><div class="last-name-info">' + lastName + '</div></div></div>';
    infoBlock.innerHTML = '';
    infoBlock.innerHTML = result;
    infoBlock.style.display = "flex";
    userTabs.firstElementChild.classList.add('white-tab');

  } else {

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://reqres.in/api/users?page=2', true);
xhr.send();
xhr.onload = function () {
  try {
  key = JSON.parse(xhr.response).page;
} catch (e) {
  infoBlock.innerHTML = '<div class="error">ERROR - wrong URL</div>';
}

  localStorage.setItem(key, xhr.response);
  localStorage.setItem('localStorageKey', key);
  userTabs.innerHTML = '';
  for (var i = 1; i <= JSON.parse(localStorage.getItem(key)).per_page; i++) {
    userTabs.innerHTML += '<div class="inner-user-tab">User ' + i + '</div>';
  };
  
  avatar = JSON.parse(localStorage.getItem(key)).data[0].avatar;
  firstName = 'first name: ' + JSON.parse(localStorage.getItem(key)).data[0].first_name;
  lastName = 'last name: ' + JSON.parse(localStorage.getItem(key)).data[0].last_name;
  result = '<div class="avatar"><img src="' + avatar + '"></div><div class="names-info"><div class="first-name-info">'
  + firstName + '</div><div class="last-name-info">' + lastName + '</div></div></div>';
  infoBlock.innerHTML = result;
  infoBlock.style.display = "flex";
  userTabs.firstElementChild.classList.add('white-tab');

};

  }
};

function updateUserBlock (event) {
  
  var target = event.target;
  if (target.className === 'inner-user-tab' || target.className === 'inner-user-tab white-tab') {
    var n = (target.textContent).indexOf(' ');
    var numTab = target.textContent.slice(n);
try {                                                          //---
      avatar = JSON.parse(localStorage.getItem(key)).data[numTab-1].avatar;
      firstName = 'first name: ' + JSON.parse(localStorage.getItem(key)).data[numTab-1].first_name;
      lastName = 'last name: ' + JSON.parse(localStorage.getItem(key)).data[numTab-1].last_name;
      result = '';
      result = '<div class="avatar"><img src="' + avatar + '"></div><div class="names-info"><div class="first-name-info">'
      + firstName + '</div><div class="last-name-info">' + lastName + '</div></div></div>';
      infoBlock.innerHTML = '';
      infoBlock.innerHTML = result;

      } catch {

        result = '';
      result = '<div class="error"><span>EVIL</span><span>someone emptied the Local Storage</span><span>please reload Users List</span></div>';
      infoBlock.innerHTML = '';
      infoBlock.innerHTML = result;

      };

      for (var i = 0; i < userTabs.childElementCount; i++) {
        if (userTabs.children[i].classList.contains('white-tab')) {
          userTabs.children[i].classList.remove('white-tab');
        };
      };
    target.classList.add('white-tab');
  };
};