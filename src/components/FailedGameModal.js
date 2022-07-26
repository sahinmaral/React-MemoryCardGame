import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getScores } from "../redux/services";
import {
  closeModal,
  getScoreboard,
  getScoreObject,
  reloadGame,
} from "../redux/cardGameSlice";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

function FailedGameModal() {
  const { t } = useTranslation();

  const scoreObject = useSelector(getScoreObject);
  const scoreboard = useSelector(getScoreboard);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getScores());
    })();
  }, [dispatch, scoreObject]);

  return (
    <div
      className="modal fade"
      id="failedGameModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="failedGameModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={{ backgroundColor: "white" }}>
          <div className="modal-header">
            <h5 className="modal-title" id="failedGameModalLabel">
              <Trans
                i18nKey="failed-game" 
                values={{ name: scoreObject.name }}
              />
            </h5>
          </div>
          <div className="modal-body">
            <h5 className="modal-title ps-1 pb-2">{t('leadership')}</h5>
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
                  <th scope="col">{t('name.scoreboard')}</th>
                  <th scope="col">{t('score.scoreboard')}</th>
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
                <b style={{ color: "blue" }}>0</b>
              </p>
            </div>
            <div id="closeFailedGameModalButton">
              <button
                data-bs-dismiss="modal"
                className="btn text-light"
                onClick={() => {
                  dispatch(reloadGame());
                  dispatch(closeModal('failedGameModal'))
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
                <b>{t('play-again')}</b>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FailedGameModal;
