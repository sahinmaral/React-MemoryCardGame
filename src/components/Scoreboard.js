import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getScores, saveScore} from "../firebase/services";
import {getScoreObject, reloadGame} from "../redux/cardGameSlice";

function Scoreboard() {
    const [scoreboard, setScoreboard] = useState([]);

    const scoreObject = useSelector(getScoreObject);
    const dispatch = useDispatch();


    useEffect(() => {
        (async () => {
            try {
                // Because of async function has got three status,
                // this component mounts two-three times depends on state of request
                // Because of component mounts multiple times , modal fade also created multiple times
                // How can I fix that ?

                await saveScore(scoreObject)
                const data = await getScores();
                setScoreboard(data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [dispatch,scoreObject]);

    return (<div
        className="modal fade"
        id="scoreboardModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="scoreboardModalLabel"
        aria-hidden="true"
    >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{backgroundColor: "white"}}>
                <div className="modal-header">
                    <h5 className="modal-title" id="scoreboardModalLabel">
                        You completed the game , {scoreObject.name}
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    <h5 className="modal-title ps-1 pb-2">Leadership</h5>
                    <div
                        style={{
                            border: "1px dashed purple", opacity: "0.6", marginBottom: "15px",
                        }}
                    ></div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {scoreboard.map((scoreObject, index) => {
                            return (<tr key={scoreObject.id}>
                                <td>
                                    <b>{index + 1}. </b>
                                    {scoreObject.name}
                                </td>
                                <td>{scoreObject.score}</td>
                            </tr>);
                        })}
                        </tbody>
                    </table>
                    <div
                        style={{
                            border: "1px dashed purple", opacity: "0.6", marginBottom: "15px",
                        }}
                    ></div>
                    <div className="d-flex justify-content-between">
                        <p>{scoreObject.name}</p>
                        <p><b style={{color: "blue"}}>{scoreObject.score}</b></p>
                    </div>
                    <div id="closeScoreboardModalButton">
                        <button
                            data-bs-dismiss="modal"
                            className="btn text-light"
                            onClick={() => {
                                dispatch(reloadGame());
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
    </div>);
}

export default Scoreboard;
