// 🌍 Global variable
let conversionRates = {
  cm: 0.01,   // centimeters to meters
  m: 1,       // base unit is meter
  km: 1000    // kilometers to meters
};

// 🛠 Function to perform conversion (with return value)
function convert(value, fromUnit, toUnit) {
  // 🏠 Local variable
  let valueInMeters = value * conversionRates[fromUnit]; // convert input → meters
  let result = valueInMeters / conversionRates[toUnit];  // meters → desired unit
  return result; // returning result
}

// 🔄 Main function to handle UI
function convertUnit() {
  let value = parseFloat(document.getElementById("value").value);
  let fromUnit = document.getElementById("unit").value;
  let toUnit = document.getElementById("convertTo").value;

  if (isNaN(value)) {
    document.getElementById("result").innerText = "❌ Please enter a valid number!";
    return;
  }

  // using our function
  let finalResult = convert(value, fromUnit, toUnit);

  document.getElementById("result").innerText = 
    `${value} ${fromUnit} = ${finalResult} ${toUnit}`;
}

// ℹ️ Example functions to show Function Types
// 1. Function Declaration
function sayHello() {
  console.log("Hello from function declaration!");
}

// 2. Function Expression
const greet = function(name) {
  console.log("Hello, " + name);
};

// 3. Arrow Function
const square = (num) => num * num;

// Calling them in console
sayHello();
greet("Meet");
console.log("Square of 5 is:", square(5));
