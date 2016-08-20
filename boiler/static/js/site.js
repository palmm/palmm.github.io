let foundFace = false;

document.addEventListener('DOMContentLoaded', function() { start() }, false);

function start() {
  // The html has pages: landing, about and projects
  // Each page has an invisible element at the top of each respective 'page'
  // element called page + Jump (e.g. landingJump)
  var pages = ["landing", "about", "projects"];
  document.addEventListener('scroll', function() { checkPage(pages) }, false);

  // face flipping
  document.getElementById("faceFlipper").addEventListener("click", function() { flipFace() });

  // track if the user has found the face flipping animations
  document.getElementById("faceFlipper").addEventListener("mouseover", function() { foundFace = true });

  // lift the face once after 1.5 s to show user of the functionality
  setTimeout(function () {
    if(!foundFace) {
      document.getElementById("face").classList.add("lift");

      setTimeout(function() {
        document.getElementById("face").classList.remove("lift");
      }, 1000);
    }
  }, 1500);

  // call once to check current user page location and update elements
  checkPage(pages);
}

// INPUT: Array of strings corresponding to the names of site pages
// NOTE: the site pages must have an element at the top of the page (no width or height)
// with the same name as the page + 'Jump' (e.g. if page is about there must be an aboutJump element).
// This allows us to get the y-posn. of that element which will be the top of that page
function checkPage(pages) {
  if(!Array.isArray(pages))
    return;

  var userScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  var userBottom = userScrollPosition + window.innerHeight; // the bottom of user screen
  var pageLocations = [];
  var currentPage = "";

  for (var page in pages) {
    // for each page provided, get the relative y position
    var pageRect = document.getElementById(pages[page] + "Jump").getBoundingClientRect();
    // normalize the y position by adding the user's current scroll location]
    // trigger next page 1/2 down the page
    var normalizedPageStart = pageRect.top + (pageRect.bottom / 2) + userScrollPosition;

    pageLocations.push(normalizedPageStart);
  }

  // iterate through page y co-ords backwards
  // if user bottom of page > page's y cord. then the user is viewing that page
  for(var i = pageLocations.length - 1; i >= 0; i--) {
    if(userBottom > pageLocations[i]) {
      currentPage = pages[i];
      break;
    }
  }

  changePath(currentPage);
  highlightButton(currentPage);
}

// changes path text content from html to current page name
function changePath(nextPath) {
  document.getElementById("path").textContent = "~/palmm/" + nextPath;
}

// changes highlights the button of the current active page
// un highlights all elements of navList first then activates the right one
function highlightButton(nextPage) {
  var navLinks = document.getElementsByClassName("navLinks");
  var childrenLinks = navLinks[0].children;

  for (var i = 0; i < childrenLinks.length; i++) {
    if(childrenLinks[i].id === nextPage + "Button")
      childrenLinks[i].classList.add("active");
    else
      childrenLinks[i].classList.remove("active");
  }
}

// toggle CSS face flip
// this could easily be in the HTML onClick... just keeping all JS in one place
function flipFace() {
  if(!foundFace)
    fountFace = true;

  document.querySelector("#face").classList.toggle("flip");
}
