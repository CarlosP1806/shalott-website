const loginForm = document.querySelector('.login__form');
const userInputElement = document.querySelector('#admin-username');
const passwordInputElement = document.querySelector('#admin-password');

loginForm.addEventListener('submit', event => {
  event.preventDefault();

  const user = userInputElement.value;
  const password = passwordInputElement.value;

  const data = {
    username: user,
    password: password
  };

  fetch('/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if(response.ok) document.location.reload();
    });
});