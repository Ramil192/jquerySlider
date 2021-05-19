


$(function ($) {
  
  const leftKey =['min','max','step','valueLeft','valueRight'];
  const leftValue =[];

  const rightKey =['isLabel','isScale','isDouble','isVertical'];
  const rightValue =[];

  const obj={};

  const inputMin = $('.sliderN1__inputNumber')[0];
  const inputMax = $('.sliderN1__inputNumber')[1];
  const inputStep = $('.sliderN1__inputNumber')[2];
  const inputValueLeft = $('.sliderN1__inputNumber')[3];
  const inputValueRight = $('.sliderN1__inputNumber')[4];

  document.querySelectorAll('.sliderN1__inputNumber').forEach(e=>leftValue.push(e.value))
  
  const inputIsLabel = $('.sliderN1__inputCheckbox')[0];
  const inputIsScale = $('.sliderN1__inputCheckbox')[1];
  const inputIsDouble = $('.sliderN1__inputCheckbox')[2];
  const inputIsVertical = $('.sliderN1__inputCheckbox')[3];
  document.querySelectorAll('.sliderN1__inputCheckbox').forEach(e=>rightValue.push(e.checked))
  
  rightKey.forEach((key,i)=>obj[key]=rightValue[i]);
  leftKey.forEach((key,i)=>obj[key]=+leftValue[i]);

  const pluginOne = $('.sliderN1__plugin').pluginRange(obj);


  inputIsLabel.addEventListener('input', (e) => {
    pluginOne.data().setSettings({ 'isLabel': e.target.checked });
  });

  inputIsScale.addEventListener('input', (e) => {
    pluginOne.data().setSettings({ 'isScale': e.target.checked });
  });

  inputIsDouble.addEventListener('input', (e) => {
    pluginOne.data().setSettings({ 'isDouble': e.target.checked });
  });

  inputIsVertical.addEventListener('input', (e) => {
    pluginOne.data().setSettings({ 'isVertical': e.target.checked });
  });

  inputMin.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      pluginOne.data().setSettings({ 'min': e.target.value });
    }
  })

  inputMax.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      pluginOne.data().setSettings({ 'max': e.target.value });
    }
  })

  inputValueLeft.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      pluginOne.data().setSettings({ 'valueLeft': e.target.value });
    }
  })

  inputValueRight.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      pluginOne.data().setSettings({ 'valueRight': e.target.value });
    }
  })

  inputStep.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      pluginOne.data().setSettings({ 'step': e.target.value });
    }
  })

});