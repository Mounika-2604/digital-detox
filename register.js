const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = registerForm[0].value;
  const email = registerForm[1].value;
  const password = registerForm[2].value;
  const confirmPassword = registerForm[3].value;

  if (password !== confirmPassword) return alert("Passwords do not match");

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    console.log("Server response:", data);

    if (data.success) {
      window.location.href = data.redirect; // Redirect to dashboard
    } else {
      // If email already exists, redirect to login with message
      if (data.redirect) {
        const message = encodeURIComponent(data.message + ". Please login with your existing account.");
        window.location.href = data.redirect + "?message=" + message;
      } else {
        alert(data.message);
      }
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong!");
  }
});