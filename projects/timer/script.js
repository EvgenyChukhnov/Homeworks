let timer = document.querySelector('.timer'),
    divShowResults = document.querySelector('.show-results'),
    buttonStart = document.getElementById('start'),
    buttonReset = document.getElementById('reset'),
    buttonSave = document.getElementById('save'),
    showMinutesDiv = document.querySelectorAll('.show-time div')[0],
    showSecondsDiv = document.querySelectorAll('.show-time div')[1],
    showMiliSecondsDiv = document.querySelectorAll('.show-time div')[2],
    spacer = document.querySelector('.spacer'),
    keyLoaderIndicator = {},
    counter = 1,
    zMiliSeconds = 0,
    zSeconds = 0,
    zMinutes = 0,
    mainCount,
    ms = '00',
    sec = '00',
    min = '00';

window.addEventListener('load', onLoadFunction);
buttonStart.addEventListener('click', mainLogicSwitch);
buttonReset.addEventListener('click', resetFunction);

window.addEventListener('beforeunload',function() {
  
  let insertElements = divShowResults.getElementsByClassName('insert');
  let arr = [];
  for (let i = 0; i < insertElements.length; i++) {
    arr[i] = insertElements[i].textContent;
  }

  keyLoaderIndicator = {
    counter: counter,
    ms: ms,
    sec: sec,
    min: min,
    zMiliSeconds: zMiliSeconds,
    zSeconds: zSeconds,
    zMinutes: zMinutes,
    dataset: timer.dataset.timerState,
    labels: arr,
  }

  if (timer.dataset.timerState !== 'initial') { localStorage.setItem('keyloader', JSON.stringify(keyLoaderIndicator)) }
});

buttonSave.onclick = function () {
  let insert = document.createElement('div');
  insert.classList.add('insert');
  insert.innerHTML = `${counter++}) ${min} : ${sec} : ${ms}`;
  divShowResults.appendChild(insert);
}

function onLoadFunction() {
  if (localStorage.getItem('keyloader')) {
    let z = JSON.parse(localStorage.getItem('keyloader'));
    let arrAflerReload = [];
    showButtonsSaveReset();
    timer.dataset.timerState = z.dataset;
    if ( timer.dataset.timerState === 'started') {
    mainCount = setInterval(mainCountFunction, 10);
    buttonStart.textContent = 'Stop';
    } else if (timer.dataset.timerState === 'stopped') {
      buttonStart.textContent = 'Run';
    }

    counter = +z.counter;
    ms = z.ms;
    sec = z.sec;
    min = z.min;
    zMiliSeconds = z.zMiliSeconds;
    zSeconds = z.zSeconds;
    zMinutes = z.zMinutes;
    arrAflerReload = z.labels;
    
    for (let i = 0; i < arrAflerReload.length; i++) {
      let insert = document.createElement('div');
      insert.classList.add('insert');
      insert.innerHTML = `${arrAflerReload[i]}`;
      divShowResults.appendChild(insert);
    }

    showTime();
  }
}

function resetFunction() {
  clearInterval(mainCount);
  localStorage.clear();
  hideButtonsSaveReset();
  timer.dataset.timerState = 'initial';
  buttonStart.textContent = 'Start';
  while(divShowResults.firstElementChild) { divShowResults.firstChild.remove() }
  counter = 1;
  ms = '00';
  sec = '00';
  min = '00';
  zMiliSeconds = 0;
  zSeconds = 0;
  zMinutes = 0;
  showTime(ms, sec, min);
}

function mainCountFunction() {
  zMiliSeconds += 1;

  if (zMiliSeconds < 10) {
    ms = `0${zMiliSeconds}`;
  } else { ms = zMiliSeconds }
  
  if (zMiliSeconds === 100) {
    ms = '00';
    zSeconds += 1;
    if (zSeconds < 10) {
      sec = `0${zSeconds}`;  
    } else { sec = +zSeconds }
    zMiliSeconds = 0;
  }

  if (zSeconds === 60) {
    zMinutes += 1;
    if (zMinutes < 10) {
      min = `0${zMinutes}`
    } else { min = zMinutes }
    zSeconds = 0;
    sec = '00';
  }

  if (zMinutes === 60) { 
    ms = '00';
    return resetFunction();
  }
  
  showTime();
}

function mainLogicSwitch() {
  switch(timer.dataset.timerState) {
    case 'initial':
      mainCount = setInterval(mainCountFunction, 10);
      timer.dataset.timerState = 'started';
      buttonStart.textContent = 'Stop';
      showButtonsSaveReset();
        break;
    case 'started':
      buttonStart.textContent = 'Run';
      clearInterval(mainCount);
      showTime();
      timer.dataset.timerState = 'stopped';
        break;
    case 'stopped':
      mainCount = setInterval(mainCountFunction, 10);
      timer.dataset.timerState = 'started';
      buttonStart.textContent = 'Stop';
      showButtonsSaveReset();
        break;
  }
}

function showTime() {
  showMiliSecondsDiv.innerHTML = ms;
  showSecondsDiv.innerHTML = sec;
  showMinutesDiv.innerHTML = min;
}

function showButtonsSaveReset() {
  buttonReset.classList.remove('hidden');
  buttonSave.classList.remove('hidden');
}

function hideButtonsSaveReset() {
  buttonSave.classList.add('hidden');
  buttonReset.classList.add('hidden');
}