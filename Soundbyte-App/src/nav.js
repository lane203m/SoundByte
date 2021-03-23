//Navigation
// SongMenu
document.querySelectorAll(".navButton")[0].addEventListener('click', () => {
  location.replace('../songMenu/songMenu.html');
});

// Criteria Search
document.querySelectorAll(".navButton")[1].addEventListener('click', () => {
  location.replace('../SavedResults/index.html');
});

// Auto Pairing
document.querySelectorAll(".navButton")[2].addEventListener('click', () => {
  location.replace('../settings/settings.html');
});