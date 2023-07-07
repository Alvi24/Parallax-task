// // import curDot from "cursor-dot";
import "./styles/styles.scss";
import Parallax from "parallax-js";

const scene = document.getElementById("scene");
const parallax = new Parallax(scene);
const cursorDot = document.querySelector(".cursorDot");
const panelButton = document.querySelector(".panelButton");
const animatedDivs = Array.from(document.querySelectorAll(".animated"));
const lastAnimatedDiv = animatedDivs.at(-1);

function resetAnimation(animatedDiv) {
  animatedDiv.classList.remove("reset", "animated");
  animatedDiv.offsetWidth; //reset animation
  animatedDiv.classList.add("reset");
}

panelButton.addEventListener(
  "mouseenter",
  () => (cursorDot.style.transform = "scale(2)"),
  {
    capture: true,
  }
);
panelButton.addEventListener(
  "mouseleave",
  () => (cursorDot.style.transform = "scale(1)"),
  {
    capture: true,
  }
);

function observeAnimatedDiv(observedDiv) {
  const observedImage = observedDiv.querySelector("img");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        //element out of page
        // console.log(observedDiv, "reset");
        resetAnimation(observedDiv);
      }
    });
  });
  observer.observe(observedImage);
}

const observedImage = lastAnimatedDiv.querySelector("img");
// console.log(observedImage);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio === 1) {
        animatedDivs.forEach((animatedDiv) => observeAnimatedDiv(animatedDiv));
      }
    });
  },
  { threshold: 1 }
);
observer.observe(observedImage);

window.addEventListener("scroll", function () {
  // moveDot(e);
  // const scrolled = window.scrollY;
  // const windowHeight = window.innerHeight;
  // const documentHeight = document.documentElement.scrollHeight;

  // const textHeightPercentage =
  //   100 - (scrolled / (documentHeight - windowHeight)) * 100;
  const endPosition =
    document.documentElement.scrollHeight - window.innerHeight;
  var scrollPosition = window.scrollY;

  // Calculate the scroll distance from the end of the animation
  var scrollDistance = endPosition - scrollPosition;

  // Calculate the percentage of scroll progress
  var scrollProgress = Math.abs((scrollDistance / endPosition) * 100);
  // Limit the scroll progress to a maximum of 100%
  const textHeightPercentage = Math.min(scrollProgress, 100);
  const animatedTexts = document.querySelectorAll(".textContainer1 h1");
  animatedTexts.forEach(
    (animatedText) =>
      (animatedText.style.clipPath = `polygon(0% 0%, 100% 0%, 100% ${textHeightPercentage}%, 0% ${textHeightPercentage}%)`)
  );
});

function moveDot(event) {
  //   console.log(event.clientX, event.clientY);
  //   console.log(event.pageX, event.pageY);
  setTimeout(() => {
    const x = event.clientX + window.scrollX;
    const y = event.clientY + window.scrollY;
    // if (!x && y) console.log(" notdefined");
    cursorDot.style.left = x + "px";
    cursorDot.style.top = y + "px";
  }, 50);
}

// // Add event listener to track cursor movement
document.addEventListener("mousemove", moveDot);
