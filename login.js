const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const email = form[0].value;
  const password = form[1].value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    console.log("Login response:", data);
    
    if (data.success) {
      window.location.href = data.redirect;
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong!");
  }
});