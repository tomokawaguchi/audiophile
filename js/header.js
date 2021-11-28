//=======================================
// Handing Mobile Menu open/close
//=======================================

const body = document.body;
const mobileButton = document.getElementById('mobile-menu-trigger');
mobileButton.addEventListener('click', function () {
  if (body.classList.contains('isMobile')) {
    body.classList.remove('isMobile');
  } else {
    body.classList.add('isMobile');
  }
});

//=======================================
// Handing Sticky Header On Scroll
//=======================================
// const header = document.querySelector('header');
const headerMain = document.getElementById('header-main');
const headerHight = headerMain.offsetHeight;

window.addEventListener('scroll', function (event) {
  let scrollObject = event.target.scrollingElement;
  if (!scrollObject) scrollObject = event.target.documentElement; // For I.E support

  if (scrollObject.scrollTop > headerHight) {
    headerMain.classList.add('active-scroll');
  } else {
    headerMain.classList.remove('active-scroll');
  }
});

//=======================================
// Handing Pushing Body Contents Underneath of Sticky Header
//=======================================

const subpageHeaderMain = document.querySelector('#header-main.subpage');
const mainContent = document.querySelector('.main-content');

if (mainContent && subpageHeaderMain) {
  mainContent.style.cssText = `margin-top: ${headerHight}px;`;
}
