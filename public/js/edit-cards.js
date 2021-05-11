const flashCard = document.querySelector(".flashcard");
const editCardBtn = document.querySelector(".edit-btn");
const exitBtn = document.querySelector(".exit-btn");

const flash = (e) => {
  flashCard.style.transform = "rotateX(180deg)"

  e.preventDefault()
}

const flashBack = (e) => {
  flashCard.style.transform = "rotateX(0deg)"

  e.preventDefault()
}

editCardBtn.addEventListener("click", flash);

exitBtn.addEventListener("click", flashBack);