let elem = document.getElementById("fullscreen-video");
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
function checkQuizAnswer() {
    const answers = {
      q1: "option2",
      q2: "option1",
      q3: "option1",
      q4: "option2",
      q5: "option3",
      q6: "option2",
      q7: "option3",
      q8: "option1",
      q9: "option1",
      q10: "option2",
    };
  
    let correctCount = 0;
  
    for (const [question, correctAnswer] of Object.entries(answers)) {
      const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
  
      if (selectedAnswer && selectedAnswer.value === correctAnswer) {
        correctCount++;
      }
    }
  
    const totalQuestions = Object.keys(answers).length;
  
    // Provide feedback based on the number of correct answers
    if (correctCount === totalQuestions) {
      showNotification('success', `Congratulations! You got all ${totalQuestions} questions correct.`);
    } else {
      showNotification('error', `You got ${correctCount} out of ${totalQuestions} questions correct. Keep trying!`);
    }
    // Close the modal after checking the answers
    const modal = new bootstrap.Modal(document.getElementById('carQuizModal'));
    modal.hide();
  }
  function showNotification(type, message) {
    const notificationElement = document.getElementById('notification');
    notificationElement.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
}

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  let x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  
  if (currentTab === 0) {
    let firstName = y[0].value.trim();
    let lastName = y[1].value.trim();

    // Use regex to validate that names contain only letters
    let nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      valid = false;
    }
  }
  if (currentTab === 1) {
    var email = y[0].value.trim();
    var phone = y[1].value.trim();

    // Use regex to validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Use regex to validate phone number format (basic example)
    var phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email) || !phoneRegex.test(phone)) {
      valid = false;
    }
  }
  if (currentTab === 2) {
    var day = y[0].value.trim();
    var month = y[1].value.trim();
    var year = y[2].value.trim();

    // Use regex to validate that day, month, and year contain only digits
    var digitRegex = /^\d+$/;

    if (!digitRegex.test(day) || !digitRegex.test(month) || !digitRegex.test(year)) {
      valid = false;
    }
  }
  if (currentTab === 3) {
    var cardNumber = y[0].value.trim();
    var expirationDate = y[1].value.trim();
    var cvv = y[2].value.trim();

    // Use regex to validate a 16-digit credit card number
    var cardNumberRegex = /^\d{16}$/;

    // Use regex to validate expiration date in MM/YY format
    var expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    // Use regex to validate a 3-digit CVV
    var cvvRegex = /^\d{3}$/;

    if (!cardNumberRegex.test(cardNumber) || !expirationDateRegex.test(expirationDate) || !cvvRegex.test(cvv)) {
      valid = false;
    }
  }
  for (i = 0; i < y.length; i++) {
    if (y[i].value == "") {
      y[i].className += " invalid";
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid;
}

function fixStepIndicator(n) {
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  x[n].className += " active";
}
