import {useEffect, useLayoutEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Card from "./components/Card";
import {
  getCards,
  getMatchedCards,
  getScoreObject, openLoginModal,
  openScoreboard,
  reloadGame,
} from "./redux/cardGameSlice";

import Scoreboard from "./components/Scoreboard";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";

function App() {
  const cards = useSelector(getCards);
  const matchedCards = useSelector(getMatchedCards);
  const scoreObject = useSelector(getScoreObject);

  const dispatch = useDispatch();

  useEffect(() => {
    (async()=>{
      if (matchedCards.length === cards.length) {
        dispatch(openScoreboard());

      }
    })()
  }, [matchedCards, cards]);

  useEffect(() => {
    dispatch(openLoginModal())
  }, []);

  return (
    <>
      {(matchedCards.length === cards.length) && <Scoreboard />}
      <LoginModal />
      <div id="header-wrapper">
        <h1>Welcome to the Developer Memory Game</h1>
      </div>
      <div id="card-wrapper">
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <p className="m-0 p-0">
              <b>Your Score</b> : <b style={{ color: "purple" }}>{scoreObject.score}</b>
            </p>
            <button
              className="btn btn-warning text-light"
              onClick={() => dispatch(reloadGame())}
              style={{
                height: "20px",
                margin: 0,
                fontSize: "12px",
                padding: "0 5px",
              }}
            >
              <b>Reload Game</b>
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <p className="m-0 p-0">
              Your start score is <b style={{ color: "blue" }}>200</b>. Each
              correct gives <b style={{ color: "green" }}>50</b> points , each
              wrong takes <b style={{ color: "red" }}>10</b> points.
            </p>
          </div>
        </div>
        <div>
          {cards.map((card) => {
            return (
              <div
                key={card.id}
                style={{
                  display: "inline-block",
                  margin: "5px auto",
                  width: "20%",
                }}
              >
                <Card cardInfo={card} />
              </div>
            );
          })}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default App;
