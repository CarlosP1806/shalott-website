const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  const response = await fetch('/contacto/solicitud', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      message
    })
  });

  if(response.ok) {
    console.log("email sent!!!");
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";
  } else {
    console.log("error");
  }
});