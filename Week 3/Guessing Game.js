const max = prompt("Enter the Maximum Number:");
console.log(max);

const random = Math.floor(Math.random() * max) + 1;

let guess = prompt("Guess thr Number");

while (true) {
    if (guess == "quit") {
        console.log("user quit");
        break;
    }
    if (guess == random) {
    console.log("You are Right! Congratulations! random number was ", random);
    break;
    } else if (guess < random) {
        guess = prompt("Hint : Your guess was too small. Please try again");
    } else {
        guess = prompt("Hint : Your guess was too large. Please try again");
    }
    // else {
    // guess = prompt("Your guess was wrong. Please try again")
    // }
}
