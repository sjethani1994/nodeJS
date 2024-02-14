async function register() {
  // Retrieve form values
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let username = document.getElementById("username").value;

  // Check if both email and password are provided
  if (email && password) {
    try {
      // Send a POST request to the registration endpoint
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      // Check if the response status is not OK (status code other than 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response data as JSON
      const data = await response.json();

      // Store the authentication token in session storage for future requests
      sessionStorage.setItem("token", data.token);

      // Redirect to the index page after successful registration
      window.location.href = "index.html";
    } catch (error) {
      // Handle errors during the fetch or if the server responds with a non-OK status
      console.error(
        "Error Registering:",
        error.message || "An unexpected error occurred."
      );
    }
  }
}
