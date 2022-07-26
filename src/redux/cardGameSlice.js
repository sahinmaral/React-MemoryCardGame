import { createSlice, nanoid } from "@reduxjs/toolkit";
import { items } from "./items";
import { Modal as BootstrapModal } from "bootstrap";
import * as jquery from "jquery";
import { getScores, saveScore } from "./services";

const addedItems = items
  .map((item) => {
    return { ...item, id: `${item.id}/${nanoid()}` };
  })
  .concat(items)
  .map((item) => {
    if (!item.id.includes("/"))
      return { ...item, id: `${item.id}/${nanoid()}` };
    else return { ...item };
  })
  .sort(() => Math.random() - 0.5);

const initialState = {
  items: addedItems,
  status: "idle",
  error: null,
  scoreboard: [],
  scoreObject: { name: "", score: 200 },
};

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
          return { ...item, id: `${item.id}/${nanoid()}` };
        })
        .concat(items)
        .map((item) => {
          if (!item.id.includes("/"))
            return { ...item, id: `${item.id}/${nanoid()}` };
          else return { ...item };
        })
        .sort(() => Math.random() - 0.5);
      state.scoreObject.score = 200;
    },
    openModal: (state, action) => {
      const modal = new BootstrapModal(
        document.getElementById(action.payload),
        {
          keyboard: false,
        }
      );

      modal.show();
    },
    changeName: (state, action) => {
      state.scoreObject.name = action.payload;
    },
    closeModal: (state,action) => {
      let modal = jquery(`#${action.payload}`);
      modal.hide();

      jquery(".modal-backdrop").fadeOut(500, function () {
        jquery(this).remove();
      });
    },
  },
  extraReducers: {
    [getScores.pending]: (state, action) => {
      state.status = "pending";
    },
    [getScores.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.scoreboard = action.payload;
    },
    [getScores.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [saveScore.pending]: (state, action) => {
      state.status = "pending";
    },
    [saveScore.fulfilled]: (state, action) => {
      state.status = "succeeded";
    },
    [saveScore.rejected]: (state, action) => {
      state.status = "failed";
      state.error = `Error saving score : ${action.error.message}`;
    },
  },
});

export const getScoreboard = (state) => state.cardGame.scoreboard;
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
  openModal,
  closeModal,
  openScoreboard,
} = cardGameSlice.actions;
export default cardGameSlice.reducer;
