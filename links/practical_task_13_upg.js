var container = document.getElementById('container'),
    firstPar = document.createElement('p'),
    secondPar = document.createElement('p'),
    linksFirstPar = firstPar.children,
    button = document.getElementsByTagName('button')[0],
    counter = 0;

  firstPar.innerHTML = 'Hello, here are <a href="../index.html">HOME</a> and <a href="https://twitter.com">twitter</a>';
  secondPar.innerHTML = 'Hello, here are <a href="http://google.by">Link 3</a> and <a href="https://vk.com">Link 4</a>';

  container.appendChild(firstPar);
  container.appendChild(secondPar);

  document.addEventListener("DOMContentLoaded", sessionStorageClear);
  button.addEventListener('click', addClick);

  secondPar.onclick = function (event) {
    var target = event.target,
      pathFromLS = '';

      event.preventDefault();

    if (target.tagName === 'A') {
      if (!sessionStorage.getItem(target.text)) {
        sessionStorage.setItem(target.text, JSON.stringify({path: target.origin}));
        target.href = '#';
        alert('link was saved!');
        } else {
            pathFromLS = JSON.parse(sessionStorage.getItem(target.text));
            alert(pathFromLS.path) 
        };
    
    };
  };

function addClick () {
  var colorArr = ['red', 'green', 'blue', 'yellow', 'purple'];

  for (var i = 0; i < linksFirstPar.length; i++){
    var n = linksFirstPar[i].className;
      if (n) {
        linksFirstPar[i].classList.remove(n);
      };
    linksFirstPar[i].classList.add(colorArr[counter]);
  };
  counter++;
  if(counter == 5) {counter = 0;};
};

function sessionStorageClear() {
  sessionStorage.clear();
};