const flashCard = document.querySelector(".flashcard");
const editCardBtn = document.querySelector(".edit-btn");

const flash = (e) => {
  console.log("click")
  flashCard.style.transform = "rotateX(180deg)"

  e.preventDefault()
}

editCardBtn.addEventListener("click", flash);