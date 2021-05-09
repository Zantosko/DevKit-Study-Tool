const flashCard = document.querySelector(".flashcard");
const flipBtn = document.querySelector(".flip-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let frontOfCard = document.querySelector(".front-content");
let backOfCard = document.querySelector(".back-content");

const displayCards = () => {
  getCardInfo()
  flipBtn.innerHTML = "Flip"
  flipBtn.removeEventListener("click", displayCards)
}

flipBtn.addEventListener("click", displayCards)

const flash = () => {
  if (flashCard.style.transform != "rotateX(180deg)") {
    flashCard.style.transform = "rotateX(180deg)"
  } else {
    flashCard.style.transform = "none"
  }
}

const getCardInfo = async () => {
  const itemBody = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json" 
    }
  }

  const data = await fetch(window.location.href, itemBody)
  const jsonData = await data.json()
  console.log(jsonData)

  let idx = 0;
  backOfCard.innerHTML = jsonData[idx].Answer
  frontOfCard.innerHTML = jsonData[idx].Question

  flashCard.style.display = "block";

  flipBtn.addEventListener("click", flash);

  scrollThroughCards(idx, jsonData);
}

function scrollThroughCards(idx, data) {
  // prevBtn.addEventListener("click", (e) => {
  //   flashCard.style.display = "none"

  //   setTimeout(() => {
  //     frontOfCard.innerHTML = data[idx--].Answer
  //     backOfCard.innerHTML = data[idx--].Question
  //     flashCard.style.display = "block"
  //   }, 1000)

  //   e.preventDefault()
  // })

  // nextBtn.addEventListener("click", (e) => {
  //   flashCard.style.display = "none"

  //   setTimeout(() => {
  //     frontOfCard.innerHTML = data[idx++].Answer
  //     backOfCard.innerHTML = data[idx++].Question
  //     flashCard.style.display = "block"
  //   }, 1000)

  //   e.preventDefault()
  // })

  prevBtn.addEventListener("click", (e) => {
    // there's no more card on the left of index 0
    // so exit the function early
    if (idx <= 0) return;

    flashCard.style.display = "none"

    setTimeout(() => {
      idx--; // decrease the index first
      // then use the modified index
      backOfCard.innerHTML = data[idx].Answer
      frontOfCard.innerHTML = data[idx].Question
      flashCard.style.display = "block"
    }, 500)

    e.preventDefault()
  })

  nextBtn.addEventListener("click", (e) => {
    // there's no more cards beyond the end of the list
    // so exit the function early
    if (idx >= data.length - 1) return;

    flashCard.style.display = "none"

    setTimeout(() => {
      idx++; // increase the index first
      // then use the modified index next
      backOfCard.innerHTML = data[idx].Answer
      frontOfCard.innerHTML = data[idx].Question
      flashCard.style.display = "block"
    }, 500)

    e.preventDefault()
  })

}

