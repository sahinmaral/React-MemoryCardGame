import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Card from "./components/Card";
import {
  getCards,
  getMatchedCards,
  getScoreObject,
  openModal,
  reloadGame,
} from "./redux/cardGameSlice";
import ScoreboardModal from "./components/ScoreboardModal";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import FailedGameModal from "./components/FailedGameModal";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  const cards = useSelector(getCards);
  const matchedCards = useSelector(getMatchedCards);
  const scoreObject = useSelector(getScoreObject);
  const { status } = useSelector((state) => state.cardGame);

  const dispatch = useDispatch();

  const handleSelectOption = (lang) => {
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    (async () => {
      if (matchedCards.length === cards.length) {
        if (status === "succeeded") dispatch(openModal("scoreboardModal"));
      } else if (scoreObject.score === 0) {
        dispatch(openModal("failedGameModal"));
      }
    })();
  }, [matchedCards, cards, scoreObject, dispatch, status]);

  useEffect(() => {
    dispatch(openModal("loginModal"));
  }, [dispatch]);

  return (
    <>
      {matchedCards.length === cards.length && <ScoreboardModal />}
      {scoreObject.score === 0 && <FailedGameModal />}
      <LoginModal />
      <div id="header-wrapper" className="wrapper d-flex justify-content-between">
        <h1>{t("welcome")}</h1>
        <select
          className="form-select form-select-sm"
          aria-label="Change language"
          defaultValue={i18n.language}
          onChange={(e) => handleSelectOption(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="tr">TR</option>
        </select>
      </div>
      <div id="game-information" className="wrapper mt-3">
          <div className="d-flex justify-content-between">
            <p className="m-0 p-0">
              <b>{t('score.header')}</b> :{" "}
              <b style={{ color: "purple" }}>{scoreObject.score}</b>
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
              <b>{t('reload-game')}</b>
            </button>
          </div>
          <div className="d-flex justify-content-between">
            <p className="m-0 p-0">
              <Trans
                i18nKey="game-information"
                components={{
                  blueBold: <b style={{ color: "blue" }} />,
                  greenBold: <b style={{ color: "green" }} />,
                  redBold: <b style={{ color: "red" }} />,
                }}
              />
            </p>
          </div>
      </div>
      <div id="card-wrapper" className="wrapper">
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
      <Footer />
    </>
  );
}

export default App;
