export function calculateDiet({age, weight, height, gender, goal, activity }){
age = Number(age);
weight=Number(weight);
height=Number(height);

let BMR;

if(gender.toLowerCase() === 'male'){
    BMR= 10* weight +6.25*height - 5*age +5;
}else{
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
}

let activityMultiplier =1.2;

if(activity === 'Moderate') activityMultiplier =1.55;
if (activity === 'Active') activityMultiplier = 1.725;

let calories = BMR * activityMultiplier;

if(goal==='Weight-Loss'){
    calories -=400;
}else if (goal === 'Muscle Gain') {
    calories += 300;
  }

  const protein = weight*2;
  const fats = (calories*0.25)/9;
  const carbs = (calories - (protein*4 +fats*9))/4;

return {
calories : Math.round(calories),
protein : Math.round(protein),
fats : Math.round(fats),
carbs : Math.round(carbs),
};
}
