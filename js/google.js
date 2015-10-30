// Funciones de google para el boton sign in de acceso a la tienda

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

// funciones de google para el botón google+ iniciar sesión en el registro

/**
 * Handler for the signin callback triggered after the user selects an account.
 */
function onSignInCallback(resp) {
  gapi.client.load('plus', 'v1', apiClientLoaded);
}

/**
 * Sets up an API call after the Google API client loads.
 */
function apiClientLoaded() {
  gapi.client.plus.people.get({userId: 'me'}).execute(obtenerDatosPerfilUsuario);
}

/**
 * Response callback for when the API client receives a response.
 *
 * @param resp The API response object with the user email and profile information.
 */
function obtenerDatosPerfilUsuario(resp) {
  //console.log(resp);

  // obtenemos los datos

  var primaryEmail; // ejemplo que no lo vamos a usar porque ya lo tenemos del registro
  for (var i=0; i < resp.emails.length; i++) {
    if (resp.emails[i].type === 'account') primaryEmail = resp.emails[i].value;
  }

  var nombre = resp.name.givenName;
  var apellido = resp.name.familyName;

  // completamos los campos en pantalla

  $('#nombre').val(nombre);
  $('#apellidos').val(apellido);

}
