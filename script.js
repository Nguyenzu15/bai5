// Swiper Slider initialization
new Swiper('.card-wrapper', {
  loop: true,
  spaceBetween: 30,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    0: {
      slidesPerView: 1
    },
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 3
    }
  }
});

// Ensure the DOM is fully loaded before running card game logic
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  let matched = 0;
  let cardOne, cardTwo;
  let disableDeck = false;

  function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
      clickedCard.classList.add("flip");

      if (!cardOne) {
        cardOne = clickedCard;
        return;
      }

      cardTwo = clickedCard;
      disableDeck = true;

      const cardOneImg = cardOne.querySelector(".back-view img").src;
      const cardTwoImg = cardTwo.querySelector(".back-view img").src;

      matchCards(cardOneImg, cardTwoImg);
    }
  }

  function matchCards(img1, img2) {
    if (img1 === img2) {
      matched++;
      if (matched === 8) {
        setTimeout(shuffleCard, 1000);
      }
      cardOne.removeEventListener("click", flipCard);
      cardTwo.removeEventListener("click", flipCard);
      resetCards();
    } else {
      setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
      }, 400);

      setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        resetCards();
      }, 1200);
    }
  }

  function resetCards() {
    [cardOne, cardTwo] = [null, null];
    disableDeck = false;
  }

  function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = null;

    const arr = [1, 2, 3, 4, 5, 6, 7, 8,
                 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    cards.forEach((card, i) => {
      card.classList.remove("flip");

      const imgTag = card.querySelector(".back-view img");
      imgTag.src = `images/img-${arr[i]}.png`; // ✅ Đã sửa đúng cú pháp

      card.addEventListener("click", flipCard);
    });
  }

  shuffleCard();

  cards.forEach(card => {
    card.addEventListener("click", flipCard);
  });
});
