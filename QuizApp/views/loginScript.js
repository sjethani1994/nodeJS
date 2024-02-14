async function login(event) {
  event.preventDefault(); // Prevent default form submission
  // Get user input
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Check if both email and password are provided
  if (email && password) {
    try {
      // Send a POST request to the login endpoint
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is OK (status code 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response data as JSON
      const data = await response.json();

      // Handle the logged-in user data as needed
      sessionStorage.setItem("token", data.token);
      window.location.href = "index.html";
    } catch (error) {
      // Handle errors during the fetch or if the server responds with a non-ok status
      console.error("Error Logging In:", error);
    }
  }
}
