
const obj ={
  min: 0,
  max: 100,
  step: 1,
  valueLeft: 25,
  valueRight: 175,
  isVertical: false,
  isLabel: true,
  isScale: true,
  isDouble: false,
}

$(function($) {
  const inputMin = $('.sliderN1__inputNumber')[0]; 
  const inputMax = $('.sliderN1__inputNumber')[1]; 
  const inputStep = $('.sliderN1__inputNumber')[2]; 
  const inputValueLeft = $('.sliderN1__inputNumber')[3]; 
  const inputValueRight = $('.sliderN1__inputNumber')[4]; 
  const pluginOne = $('.sliderN1__plugin').pluginRange(obj);

  const inputIsLabel = $('.sliderN1__inputCheckbox')[0];
  const inputIsScale = $('.sliderN1__inputCheckbox')[1];
  const inputIsDouble = $('.sliderN1__inputCheckbox')[2];
  const inputIsVertical = $('.sliderN1__inputCheckbox')[3];
  

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