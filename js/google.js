function onSignIn(googleUser) {
  window.location.href = '#accesoCorrecto'; // redireccionamos a la página de inicio personalizada

  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);

  // creamos unas cookies para trabajar con 'sesiones',
  // asignamos el token de google como nombre de usuario
  docCookies.setItem('usuario', id_token);
  docCookies.setItem('gtoken', id_token);
};

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}