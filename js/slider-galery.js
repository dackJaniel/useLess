// *********
// IMAGE GALARY LIGHTBOX AND SLIDER
// *********

// get all pictures from galery
const allImg = document.querySelectorAll("#lightbox .box");

// get slider buttons
const aditionalContent = document.querySelector("#aditional-content");
const [btnCloseSlide, btnPrevSlide, btnNextSlide] = document.querySelectorAll(
  "#aditional-content button"
);

const imgDotsContainer = document.querySelector(".img-dots");
let dots = [];

// get html doc
const html = document.querySelector("html");

function imgGalerySlider() {
  // close slide
  function closeSlide(img) {
    dotRemoveActive();
    img.classList.remove("active");
    aditionalContent.style = "display: none";
    html.style = " overflow:scroll";
  }

  // add active class to active element
  function addActive(img, dotActive) {
    img.classList.add("active");
    dotActive.classList.add("active");
    aditionalContent.style = "display: block";
    html.style = " overflow:hidden";
  }

  function dotRemoveActive() {
    for (let dot of dots) {
      dot.classList.remove("active");
    }
  }

  function clearIntervall() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 5000);
  }

  function dotAddActive(activeImg, activeDot) {
    dotRemoveActive();
    for (let img of allImg) {
      img.classList.remove("active");
    }
    activeImg.classList.add("active");
    activeDot.classList.add("active");
  }

  // go thew all img
  function imgLoop() {
    const arrayAllImg = Array.from(allImg);
    let activeIndex;
    arrayAllImg.forEach((img, index) => {
      if (img.classList.contains("active")) {
        activeIndex = index;
      }
    });
    // let activeIndex = arrayAllImg.indexOf(img);
    return { activeIndex, arrayAllImg };
  }

  // handle next slide
  function nextSlide() {
    dotRemoveActive();
    const newImg = imgLoop();
    let activeIndex = newImg.activeIndex;
    let imgCount = newImg.arrayAllImg.length;
    if (activeIndex === imgCount - 1) {
      newImg.arrayAllImg[activeIndex].classList.remove("active");
      newImg.arrayAllImg[0].classList.add("active");
      dots[0].classList.add("active");
    } else {
      newImg.arrayAllImg[activeIndex].classList.remove("active");
      activeIndex++;
      newImg.arrayAllImg[activeIndex].classList.add("active");
      dots[activeIndex].classList.add("active");
    }
    clearIntervall();
  }

  // handle prev slide
  function prevSlide() {
    dotRemoveActive();
    const newImg = imgLoop();
    let activeIndex = newImg.activeIndex;
    let imgCount = newImg.arrayAllImg.length;
    if (activeIndex === 0) {
      newImg.arrayAllImg[activeIndex].classList.remove("active");
      imgCount--;
      newImg.arrayAllImg[imgCount].classList.add("active");
      dots[imgCount].classList.add("active");
    } else {
      newImg.arrayAllImg[activeIndex].classList.remove("active");
      activeIndex--;
      newImg.arrayAllImg[activeIndex].classList.add("active");
      dots[activeIndex].classList.add("active");
    }
    clearIntervall();
  }
  return {
    addActive,
    closeSlide,
    nextSlide,
    prevSlide,
    dotAddActive,
  };
}

const { addActive, closeSlide, nextSlide, prevSlide, dotAddActive } =
  imgGalerySlider();

// loop threw all images in NoteList & add event listener
for (let curentImg of allImg) {
  const dot = document.createElement("div");

  curentImg.addEventListener("click", () => addActive(curentImg, dot));
  btnCloseSlide.addEventListener("click", () => closeSlide(curentImg));
  dot.addEventListener("click", () => dotAddActive(curentImg, dot));

  imgDotsContainer.append(dot);
  dots.push(dot);
}

// event listener for btn
btnNextSlide.addEventListener("click", () => nextSlide());
btnPrevSlide.addEventListener("click", () => prevSlide());

// auto slide
let autoSlide = setInterval(nextSlide, 5000);
