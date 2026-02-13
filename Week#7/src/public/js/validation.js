$(document).ready(function() {
  $("#registrationForm").submit(function(event) {
    event.preventDefault();

    let email = $("#username").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();
    let errors = [];

    // Email validation
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Invalid email format.");
    }

    // Password validation
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!passwordRegex.test(password)) {
      errors.push("Password must be at least 6 characters, contain 1 number and 1 special character.");
    }

    // Confirm password
    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      $("#errorMessages")
        .removeClass("success")
        .addClass("error")
        .html(errors.join("<br>"));
    } else {
      $("#errorMessages")
        .removeClass("error")
        .addClass("success")
        .html("Form is valid. Submitting...");

      $.ajax({
        url: "/api/register",   // ✅ updated path
        type: "POST",
        data: { username: email, password: password },
        success: function(response) {
          $("#errorMessages")
            .removeClass("error")
            .addClass("success")
            .html(response);
        },
        error: function(err) {
          $("#errorMessages")
            .removeClass("success")
            .addClass("error")
            .html("Error registering user.");
        }
      });
    }
  });
});
