const imgList = document.querySelector(".gallery-slide-list");
const images = Array.from(imgList.children);
const nextButton = document.querySelector(".next");
const prevButton = document.querySelector(".previous");
const dotsItem = document.querySelector(".gallery-dots");
const dots = Array.from(dotsItem.children);
const imgWidth = images[0].getBoundingClientRect().width;

const setImagesPosition = (images, index) => {
  images.style.left = imgWidth * index + "px";
};

images.forEach(setImagesPosition);

const slideImages = (imgList, currentImg, wantedImage) => {
  imgList.style.transform = "translateX(-" + wantedImage.style.left + ")";
  currentImg.classList.remove("current-image");
  wantedImage.classList.add("current-image");
};

const showNextImg = (event) => {
  const currentImg = imgList.querySelector(".current-image");
  const nextImg = currentImg.nextElementSibling;
  const currentDot = dotsItem.querySelector(".active");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = images.findIndex((image) => image === nextImg);

  slideImages(imgList, currentImg, nextImg);
  updateDots(currentDot, nextDot);
  hideArrows(images, nextIndex, prevButton, nextButton);
};

const showPrevImg = (event) => {
  const currentImg = imgList.querySelector(".current-image");
  const prevImg = currentImg.previousElementSibling;
  const currentDot = dotsItem.querySelector(".active");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = images.findIndex((image) => image === prevImg);

  slideImages(imgList, currentImg, prevImg);
  updateDots(currentDot, prevDot);
  hideArrows(images, prevIndex, prevButton, nextButton);
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("active");
  targetDot.classList.add("active");
};

const hideArrows = (images, targetIndex, prevButton, nextButton) => {
  if (targetIndex === 0) {
    prevButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  } else if (targetIndex === images.length - 1) {
    prevButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  } else {
    prevButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  }
};

const handleDots = (event) => {
  const targetDot = event.target.closest("button");

  if (!targetDot) return;

  const currentImg = imgList.querySelector(".current-image");
  const currentDot = dotsItem.querySelector(".active");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const wantedImage = images[targetIndex];

  slideImages(imgList, currentImg, wantedImage);
  updateDots(currentDot, targetDot);
  hideArrows(images, targetIndex, prevButton, nextButton);
};

nextButton.addEventListener("click", showNextImg);
prevButton.addEventListener("click", showPrevImg);
dotsItem.addEventListener("click", handleDots);
