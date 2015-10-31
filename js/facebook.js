/* Funciones del api de facebook */

// fb sdk:

window.fbAsyncInit = function() {
  FB.init({
    appId      : '533959343433870',
    xfbml      : true,
    version    : 'v2.5'
  });

  // Now that we've initialized the JavaScript SDK, we call
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  // js.src = "//connect.facebook.net/en_US/sdk.js"; // necesario cambiarlo por la asignación siguiente:
  js.src ="https://connect.facebook.net/en_US/all.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* Funciones para el login con fb */

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  //console.log('statusChangeCallback');
  //console.log(response);

  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    acceso();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    console.log('logeado en fb pero no en la tienda');

    // si se llega aquí no interesa logearle sin fb
    window.location.href = '#logout';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    console.log('test');
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function acceso() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    //console.log(response);

    // creamos dos cookies con el id de usuario para gestionar las 'sesiones'
    docCookies.setItem('usuario', response.id);
    docCookies.setItem('fbtoken', response.id);

    // damos acceso a la tienda redireccionando la url
    window.location.href = '#accesoCorrecto';

  });
}

// función de logout de fb y de la aplicacion
function fbLogout() {
  FB.logout(function(response) {
    // Person is now logged out
    console.log('log out correcto');
    //console.log(response);
  });
}