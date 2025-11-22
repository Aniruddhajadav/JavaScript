// Select form and messages
const form = document.getElementById("contactForm");
const errorMsg = document.getElementById("errorMsg");
const successMsg = document.getElementById("successMsg");

// Handle form submission
form.onsubmit = function (e) {
  e.preventDefault(); // stop page reload

  // Get values
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  // Reset messages
  errorMsg.innerText = "";
  successMsg.innerText = "";

  // Validate inputs
  if (name.length < 3) {
    errorMsg.innerText = "❌ Name must be at least 3 characters.";
    return;
  }

  if (!validateEmail(email)) {
    errorMsg.innerText = "❌ Please enter a valid email address.";
    return;
  }

  if (message.length < 10) {
    errorMsg.innerText = "❌ Message must be at least 10 characters.";
    return;
  }

  // If all valid
  successMsg.innerText = "✅ Form submitted successfully!";
  form.reset();
};

// Email validation function
function validateEmail(email) {
  // simple regex for email
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return pattern.test(email.toLowerCase());
}
