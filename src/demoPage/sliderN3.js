
const obj ={
  min: 0,
  max: 100,
  step: 1,
  valueLeft: 25,
  valueRight: 75,
  isVertical: false,
  isLabel: true,
  isScale: true,
  isDouble: false,
}

$(function($) {
  const inputMin = $('.sliderN3__inputNumber')[0]; 
  const inputMax = $('.sliderN3__inputNumber')[1]; 
  const inputStep = $('.sliderN3__inputNumber')[2]; 
  const inputValueLeft = $('.sliderN3__inputNumber')[3]; 
  const inputValueRight = $('.sliderN3__inputNumber')[4]; 
  const pluginOne = $('.sliderN3__plugin').pluginRange(obj);

  const inputIsLabel = $('.sliderN3__inputCheckbox')[0];
  const inputIsScale = $('.sliderN3__inputCheckbox')[1];
  const inputIsDouble = $('.sliderN3__inputCheckbox')[2];
  const inputIsVertical = $('.sliderN3__inputCheckbox')[3];
  

  inputIsLabel.addEventListener('input',(e)=>{
    pluginOne.data().setIsLabel(e.target.checked);
  });

  inputIsScale.addEventListener('input',(e)=>{
    pluginOne.data().setIsScale(e.target.checked);
  });

  inputIsDouble.addEventListener('input',(e)=>{
    pluginOne.data().setIsDouble(e.target.checked);
  });

  inputIsVertical.addEventListener('input',(e)=>{
    pluginOne.data().setIsVertical(e.target.checked);
  });

  inputMin.addEventListener('input',(e)=>{
    
    pluginOne.data().setMin(e.target.value);
  })

  inputMin.addEventListener('keydown',(e)=>{
    if(e.keyCode===13)
    {
      pluginOne.data().setMin(e.target.value);
    }
  })

  inputMax.addEventListener('input',(e)=>{
    pluginOne.data().setMax(e.target.value);
  })

  inputMax.addEventListener('keydown',(e)=>{
    if(e.keyCode===13)
    {
      pluginOne.data().setMax(e.target.value);
    }
  })

  inputValueLeft.addEventListener('input',(e)=>{
    pluginOne.data().setValueLeft(e.target.value);
  })

  inputValueLeft.addEventListener('keydown',(e)=>{
    if(e.keyCode===13)
    {
      pluginOne.data().setValueLeft(e.target.value);
    }
  })

  inputValueRight.addEventListener('input',(e)=>{
    pluginOne.data().setValueRight(e.target.value);
  })

  inputValueRight.addEventListener('keydown',(e)=>{
    if(e.keyCode===13)
    {
      pluginOne.data().setValueRight(e.target.value);
    }
  })

  inputStep.addEventListener('input',(e)=>{
    pluginOne.data().setStep(e.target.value);
  })

  inputStep.addEventListener('keydown',(e)=>{
    if(e.keyCode===13)
    {
      pluginOne.data().setStep(e.target.value);
    }
  })
  
});