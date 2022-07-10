const weightInp = document.querySelector('#weight-input');
const heightInp = document.querySelector('#height-input');
const rangeInps = document.querySelectorAll('.range');
const output = document.querySelector('#output-div');
const weightLabel = document.querySelector('#weight-label');
const heightLabel = document.querySelector('#height-label');

let weight = 80, height = 1.75;

window.onload = () =>{
    if(localStorage.length < 1){
        localStorage.setItem('userInfo', JSON.stringify(bmiCalc(weight, height)));
    }

    if(localStorage.length > 0){
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const {uWeight, uHeight, bmi, category} = userInfo;
        output.innerHTML = outputDivContent(parseFloat(bmi, 10).toPrecision(3), category);
        weightInp.value = parseInt(uWeight, 10);
        heightInp.value = parseInt(uHeight * 100, 10);
        weightLabel.innerHTML = `${uWeight}kg`;
        heightLabel.innerHTML = `${parseInt(uHeight * 100)}cm`
    }
}

const outputDivContent = (bmi, cat) =>{
    return ` <span id="bmi">${bmi}</span><span id="cat">${cat}</span> `;
}

const onSlidersChange = (inp) =>{
    if(inp.id === 'weight-input'){
        weight = parseFloat(inp.value);
        weightLabel.innerHTML = `${weight}kg`
    }

    if(inp.id === 'height-input'){
        height = parseFloat(inp.value)/100;
        heightLabel.innerHTML = `${parseInt(height * 100, 10)}cm`
    }
    
    const {bmi, category} = bmiCalc(weight, height);
    localStorage.setItem('userInfo', JSON.stringify(bmiCalc(weight, height)));
    output.innerHTML = outputDivContent(bmi.toPrecision(3), category);
}

const bmiCalc = (weight, height) =>{
    const scale = [
        {name: 'underweight', min: 0, max: 18.50},
        {name: 'normal', min: 18.50, max: 24.90},
        {name: 'overweight', min: 24.91, max: 29.90},
        {name: 'obese', min: 29.91, max:34.90},
        {name: 'extremly obese', min: 34.91, max: 200},
    ];

    const bmi = weight/(height*height);
    let weightCat;
    scale.forEach((cat , i)=>{
        const {name, min, max} = cat;
        if(bmi >= min && bmi <= max) weightCat = name;
    });

    const userInfo = {uWeight: weight, uHeight: height, bmi: bmi, category: weightCat};


    return userInfo;
}

rangeInps.forEach((inp) => inp.addEventListener('input', () => onSlidersChange(inp)));

