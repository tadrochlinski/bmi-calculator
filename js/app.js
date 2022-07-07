const weightInp = document.querySelector('#weight-input');
const heightInp = document.querySelector('#height-input');
const rangeInps = document.querySelectorAll('.range');
const output = document.querySelector('#output-div');
const weightLabel = document.querySelector('#weight-label');
const heightLabel = document.querySelector('#height-label');

let weight = 80, height = 1.75;

const onSlidersChange = (inp) =>{
    if(inp.id === 'weight-input'){
        weight = parseFloat(inp.value);
        weightLabel.innerHTML = `${weight}kg`
    }

    if(inp.id === 'height-input'){
        height = parseFloat(inp.value)/100;
        heightLabel.innerHTML = `${parseInt(height * 100)}cm`
    }

    console.log(weight, height)
    bmiCalc(weight, height);
}

const bmiCalc = (weight, height) =>{
    const bmi = weight/(height*height);
    console.log(bmi);
}

rangeInps.forEach((inp) => inp.addEventListener('input', () => onSlidersChange(inp)));

