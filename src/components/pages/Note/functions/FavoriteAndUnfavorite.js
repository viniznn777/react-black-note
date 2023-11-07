import {
  functionFavoriteButton,
  functionUnfavoriteButton,
} from "../../../utilities/FunctionFavoriteButton";

// Funçòes do NoteComponent
export const Favorite = (setFavorite, id, user, token) => {
  setFavorite(true);
  functionFavoriteButton(id, user, token);
};

export const Unfavorite = (setFavorite, favorite, id, user, token) => {
  // "!" ivertendo o valor da variável que está atualmente.
  setFavorite(!favorite);
  functionUnfavoriteButton(id, user, token);
};
