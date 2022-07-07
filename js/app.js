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
    
    const {bmi, category} = bmiCalc(weight, height);
    output.innerHTML = `${bmi.toPrecision(3)} : ${category}`
}

const bmiCalc = (weight, height) =>{
    const scale = [
        {name: 'underweight', min: 0, max: 18.5},
        {name: 'normal', min: 18.5, max: 24.9},
        {name: 'overweight', min: 25, max: 29.9},
        {name: 'obese', min: 30, max:34.9},
        {name: 'extremly obese', min: 35, max: 200},
    ];

    const bmi = weight/(height*height);
    let weightCat;
    scale.forEach((cat , i)=>{
        const {name, min, max} = cat;
        if(bmi > min && bmi < max) weightCat = name;
    });

    const userInfo = {bmi: bmi, category: weightCat};


    return userInfo;
}

rangeInps.forEach((inp) => inp.addEventListener('input', () => onSlidersChange(inp)));

