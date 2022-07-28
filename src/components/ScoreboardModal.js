import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScores, saveScore } from "../redux/services";
import {
  closeModal,
  getScoreboard,
  getScoreObject,
  reloadGame,
} from "../redux/cardGameSlice";
import { Trans } from "react-i18next";
import { t } from "i18next";

function ScoreboardModal() {
  const scoreboard = useSelector(getScoreboard);
  const scoreObject = useSelector(getScoreObject);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(saveScore(scoreObject));
      await dispatch(getScores());
    })();
  }, [dispatch, scoreObject]);

  return (
    <div
      className="modal fade"
      id="scoreboardModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="scoreboardModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "white" }}>
          <div className="modal-header">
            <h5 className="modal-title" id="scoreboardModalLabel">
              <Trans
                i18nKey="completed-game"
                values={{ name: scoreObject.name }}
              />
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                dispatch(closeModal("scoreboardModal"));
              }}
            ></button>
          </div>
          <div className="modal-body">
            <h5 className="modal-title ps-1 pb-2">{t("leadership")}</h5>
            <div
              style={{
                border: "1px dashed purple",
                opacity: "0.6",
                marginBottom: "15px",
              }}
            ></div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">{t("name.scoreboard")}</th>
                  <th scope="col">{t("score.scoreboard")}</th>
                </tr>
              </thead>
              <tbody>
                {scoreboard.map((scoreObject, index) => {
                  return (
                    <tr key={scoreObject.id}>
                      <td>
                        <b>{index + 1}. </b>
                        {scoreObject.name}
                      </td>
                      <td>{scoreObject.score}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div
              style={{
                border: "1px dashed purple",
                opacity: "0.6",
                marginBottom: "15px",
              }}
            ></div>
            <div className="d-flex justify-content-between">
              <p>{scoreObject.name}</p>
              <p>
                <b style={{ color: "blue" }}>{scoreObject.score}</b>
              </p>
            </div>
            <div id="closeScoreboardModalButton">
              <button
                data-bs-dismiss="modal"
                className="btn text-light"
                onClick={() => {
                  dispatch(reloadGame());
                  dispatch(closeModal("scoreboardModal"));
                }}
                style={{
                  float: "right",
                  backgroundColor: "lightblue",
                  height: "30px",
                  width: "100px",
                  margin: 0,
                  fontSize: "13px",
                  padding: "0 5px",
                }}
              >
                <b>Play Again</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreboardModal;
