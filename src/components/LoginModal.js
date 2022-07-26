import {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {useDispatch} from "react-redux";
import {changeName, closeModal} from "../redux/cardGameSlice";

function LoginModal() {

    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        if (name.length === 0) {
            setError(t('enter-name.form'))
        }
        else{
            setError(null)
        }
    }, [name,t]);

    const handleSubmit = (event) => {
        event.preventDefault()

        if (name.length === 0) {
            setError(t('enter-name.form'))
            return;
        }

        setError(null)
        dispatch(changeName(name))
        dispatch(closeModal('loginModal'))
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
                            {t('enter-name.header')}
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} id='loginForm'>
                            <input type="text" className={`w-100 form-control ${error && 'is-invalid'}`} defaultValue={name}
                                   onChange={(e) => setName(e.target.value)}/>
                            <small id="passwordHelp" className="text-danger">
                                {error}
                            </small>
                            <button type="submit" className='btn btn-success w-100 mt-3'>{t('start-game')}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>);
}

export default LoginModal;