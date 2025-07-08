window.onload=function(){
  let slides = document.querySelectorAll(".slides img");
  const slidesContainer = document.querySelector(".slides");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  let interval;
  let currentIndex=1;


  //clone wars
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  // Add clones to the the army with a thousand more on their way
  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slides[0]);
  slides = document.querySelectorAll(".slides img");
  const slide_width = document.querySelector(".slide-container").offsetWidth;
  slidesContainer.style.transform = `translateX(-${slide_width * currentIndex}px)`;

  // Slide update function
  function updateSlide() {
    slidesContainer.style.transition = "transform 0.5s ease-in-out";
    slidesContainer.style.transform = `translateX(-${slide_width * currentIndex}px)`;
  }

  // Handle looping logic
  slidesContainer.addEventListener("transitionend", () => {
    if (currentIndex == slides.length-1) {
      slidesContainer.style.transition = "none";
      currentIndex = 1;
      slidesContainer.style.transform = `translateX(-${slide_width * currentIndex}px)`;
    }

    if (currentIndex == 0) {
      slidesContainer.style.transition = "none";
      currentIndex = slides.length - 2;
      slidesContainer.style.transform = `translateX(-${slide_width * currentIndex}px)`;
    }
  });

  // Auto-play
  function autoSlide() {
    interval = setInterval(() => {
      currentIndex++;
      updateSlide();
    }, 5000);
  }
  autoSlide();

  // Next button
  next.addEventListener("click", () => {
    clearInterval(interval);
    currentIndex++;
    updateSlide();
    autoSlide();
  });

  // Prev button
  prev.addEventListener("click", () => {
    clearInterval(interval);
    currentIndex--;
    updateSlide();
    autoSlide();
  });
};


// slider FINALLY over
const Faq=document.querySelector(".Faq");
const Home =document.querySelector(".Home");
if(Faq){
  Faq.addEventListener("click",function(){
    window.location.href="Faq.html";
  });
}
if(Home){
  Home.addEventListener("click",function(){
    window.location.href="Luminous.html";
  });
}



//search

//input
document.getElementById("Ser").addEventListener("keydown",function(e){
  if(e.key=="Enter"){
    const query= e.target.value.trim();
    if(query){
      window.location.href=`results.html?search=${encodeURIComponent(query)}`;
    }
  }
})
import { items } from "./dataaa.js";

//the actual filter stuff ugghhhhh
if (window.location.pathname.includes("results.html")) {

  const params = new URLSearchParams(window.location.search);
  const query = params.get("search")?.toLowerCase() || "";
  const container = document.getElementById("container");

  if (container) {
    const filtered = items.filter(item =>
      item.name.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      container.innerHTML = `<p>No results found for "${query}"</p>`;
    } else {
      filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `<img src="${item.img}" alt="${item.name}" />  <p>${item.name}</p><br><p>${item.price}</p>`;
        container.appendChild(card);
      });
    }
  }
}

