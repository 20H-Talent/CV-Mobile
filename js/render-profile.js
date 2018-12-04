class ProfileHelpers {
  static readSessionData() {
    const id = JSON.parse(sessionStorage.getItem('id'));
    const profile = JSON.parse(sessionStorage.getItem('profile'));
    return { id, profile };
  }
}

class ProfileRender {
  redirectToCorrectProfile() {
    let route = '';
    const { profile, id } = this.userData;

    if (profile === 'user') {
      route = `profile.html?id=${id}`;
      window.location.replace(route);
    } else if (profile === 'company') {
      route = `company-profile.html?id=${id}`;
      window.location.replace(route);
    }
  }

  init() {
    this.userData = ProfileHelpers.readSessionData();
    this.redirectToCorrectProfile();
  }
}

window.onload = new ProfileRender().init();
