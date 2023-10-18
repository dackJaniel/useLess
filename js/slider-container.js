// *********
// SLIDER FOR BLOG ELEMENTS (RESPONSIVE LAYOUT)
// *********

// get all article containers
const articlesContainer = document.querySelectorAll("#articles");
// get the count of all articles
const articlesCount = document.querySelectorAll("#articles .container").length;
// get slider buttons
const [btnLeft, btnRight] = document.querySelectorAll(".btn-slider");
const article = document.querySelectorAll("#articles .container");

let position = 0; // start position
const sliderPixels = 346; // sliderPixels container, margin & padding

function slide(direction) {
  if (direction === "slideLeft") {
    // max times to slide left
    if (position !== 0) {
      position = position + sliderPixels;
      articlesContainer[0].style = `transform: translateX(${position}px); transition: all .5s`;
    }
  } else {
    // max times to slide right
    if (position !== 0 - sliderPixels * (articlesCount - 1)) {
      position = position - sliderPixels;
      articlesContainer[0].style = `transform: translateX(${position}px); transition: all .5s`;
    } else {
      position = 0;
      articlesContainer[0].style = `transform: translateX(${position}px); transition: all .5s`;
    }
  }
}

// event listener for btn
btnLeft.addEventListener("click", () => slide("slideLeft"));
btnRight.addEventListener("click", () => slide("slideRight"));
