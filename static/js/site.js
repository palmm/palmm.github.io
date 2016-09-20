var foundFace = false;

document.addEventListener('DOMContentLoaded', function() { start() }, false);

function start() {

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
}

// toggle CSS face flip
// this could easily be in the HTML onClick... just keeping all JS in one place
function flipFace() {
  if(!foundFace)
    fountFace = true;

  document.querySelector("#face").classList.toggle("flip");
}
