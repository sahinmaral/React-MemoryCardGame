import {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {changeName, closeLoginModal} from "../redux/cardGameSlice";

function LoginModal() {

    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        if (name.length === 0) {
            setError('Please enter name')
        }
        else{
            setError(null)
        }
    }, [name]);

    const handleSubmit = (event) => {
        event.preventDefault()

        if (name.length === 0) {
            setError('Please enter name')
            return;
        }

        setError(null)
        dispatch(changeName(name))
        dispatch(closeLoginModal())
    }

    return (<div
            className="modal fade"
            id="loginModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="loginModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{backgroundColor: "white"}}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="loginModalLabel">
                            Enter name to save your score on scoreboard
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} id='loginForm'>
                            <input type="text" className={`w-100 form-control ${error && 'is-invalid'}`} defaultValue={name}
                                   onChange={(e) => setName(e.target.value)}/>
                            <small id="passwordHelp" className="text-danger">
                                {error}
                            </small>
                            <button type="submit" className='btn btn-success w-100 mt-3'>Start game</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
}

export default LoginModal;