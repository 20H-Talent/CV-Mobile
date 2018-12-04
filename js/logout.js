function closeCurrentSession() {
  sessionStorage.removeItem('id');
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('profile');
  window.location.replace('/html/login.html');
}

window.onload = closeCurrentSession();
