import { useSelector, useDispatch } from "react-redux";
import {
  decreasePoint,
  getOpenedCards,
  increasePoint,
  updateCard,
} from "../redux/cardGameSlice";

function Card({ cardInfo }) {
  const openedCards = useSelector(getOpenedCards)
  const dispatch = useDispatch();

  const flipCard = (id) => {
    const element = document.getElementById(id);
    const transformStatus = element.style.transform;
    if (transformStatus) {
      element.style.transform = "";
    } else {
      element.style.transform = "rotateY(180deg)";
    }
  };

  const cardMatchCheck = (currentCard) => {
    const firstCardName = openedCards[0].id.split("/")[0];
    const currentCardName = currentCard.id.split("/")[0];

    if (firstCardName === currentCardName) {
      if(openedCards[0].id === currentCard.id) return;
      else{
        openedCards.forEach((card) => {
          dispatch(updateCard({ ...card, isMatched: true,isOpened: true }));
        });
        dispatch(updateCard({ ...currentCard, isMatched: true,isOpened: true  }));
  
        dispatch(increasePoint());
      }
    } else {
      openedCards.forEach((card) => {
        dispatch(updateCard({ ...card, isOpened: false }));
      });
      dispatch(updateCard({ ...currentCard, isOpened: false }));
      dispatch(decreasePoint());
      setTimeout(() => {
        openedCards.forEach((card) => {
          flipCard(card.id);
        });
        flipCard(cardInfo.id);
      }, 1000);
    }
  };

  const flipCardHandleClick = () => {
    if (cardInfo.isMatched) return;
    flipCard(cardInfo.id);
    dispatch(updateCard({ ...cardInfo, isOpened: !cardInfo.isOpened }));
    if (openedCards.length === 1) {
      cardMatchCheck(cardInfo);
    }
    
  };

  return (
    <div className="flip-card">
      <div
        className="flip-card-inner"
        id={cardInfo.id}
        onMouseUp={flipCardHandleClick}
      >
        <div className="flip-card-front">
          <img
            src="./images/cardFront.png"
            alt="Card Front"
          />
        </div>
        <div className="flip-card-back">
          <img
            src={cardInfo.imageUrl}
            alt={cardInfo.id}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
