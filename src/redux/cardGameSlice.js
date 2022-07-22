import {createSlice, nanoid} from "@reduxjs/toolkit";
import {items} from "./items";
import {Modal as BootstrapModal} from "bootstrap";
import {saveScoreAsync} from "../firebase/services";
import * as jquery from 'jquery';


const addedItems = items
    .map((item) => {
        return {...item, id: `${item.id}/${nanoid()}`};
    })
    .concat(items)
    .map((item) => {
        if (!item.id.includes("/"))
            return {...item, id: `${item.id}/${nanoid()}`};
        else return {...item};
    })
    .sort(() => Math.random() - 0.5);

const initialState = {
    items: addedItems,
    isLoading: false,
    error: null,
    scoreObject: {name: '', score: 200, orderNumber: null},
};

const closeScoreboard = () => {
    let modal = jquery('#scoreboardModal')
    modal.hide()

    jquery('.modal-backdrop').fadeOut(500, function () {
        jquery(this).remove();
    });
}

export const cardGameSlice = createSlice({
    name: "cardGame",
    initialState,
    reducers: {
        updateCard: (state, action) => {
            const index = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            state.items[index].isOpened = action.payload.isOpened;
            state.items[index].isMatched = action.payload.isMatched;
        },
        increasePoint: (state) => {
            state.scoreObject.score += 50;
        },
        decreasePoint: (state) => {
            state.scoreObject.score -= 10;
        },
        reloadGame: (state) => {
            state.items = items
                .map((item) => {
                    return {...item, id: `${item.id}/${nanoid()}`};
                })
                .concat(items)
                .map((item) => {
                    if (!item.id.includes("/"))
                        return {...item, id: `${item.id}/${nanoid()}`};
                    else return {...item};
                })
                .sort(() => Math.random() - 0.5);
            state.scoreObject.score = 200;
        },
        openScoreboard: () => {
            const modal = new BootstrapModal(
                document.getElementById("scoreboardModal"),
                {
                    keyboard: false,
                }
            );

            modal.show();
        },
        openLoginModal: () => {
            const modal = new BootstrapModal(
                document.getElementById("loginModal"),
                {
                    keyboard: false,
                }
            );

            modal.show();
        },
        changeName: (state, action) => {
            state.scoreObject.name = action.payload
        },
        closeLoginModal: () => {
            let modal = jquery('#loginModal')
            modal.hide()

            jquery('.modal-backdrop').fadeOut(500, function () {
                jquery(this).remove();
            });

        }
    }
});

export const getCards = (state) => state.cardGame.items;
export const getOpenedCards = (state) =>
    state.cardGame.items.filter((value) => value.isOpened && !value.isMatched);
export const getMatchedCards = (state) =>
    state.cardGame.items.filter((value) => value.isMatched);
export const getScoreObject = (state) => state.cardGame.scoreObject;
export const {
    updateCard,
    increasePoint,
    decreasePoint,
    reloadGame,
    changeName,
    openLoginModal,
    closeLoginModal,
    openScoreboard,
} = cardGameSlice.actions;
export default cardGameSlice.reducer;
