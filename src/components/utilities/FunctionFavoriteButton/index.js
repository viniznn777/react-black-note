import { URL_NOTES } from "../Api/basesUrl";
import { errorMessage, infoMessage } from "../toastMessages";

// Funções para favoritar e desfavoritar uma nota
// Recebem os parâmetros id que é o id da nota, me que é o id do usuário e key que é o token JWT de autenticação. Todos são tradados e validados no back end

export const functionFavoriteButton = async (id, me, key) => {
  try {
    const response = await URL_NOTES.put(
      `/favorite/${id}?me=${me}&key=${key}&favorite_value=true`
    );

    if (response.status === 200) {
      infoMessage("Favoritado com sucesso!", 1500);
    } else if (response.status === 400) {
      errorMessage("Houve um erro ao favoritar esta nota!");
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
export const functionUnfavoriteButton = async (id, me, key) => {
  try {
    const response = await URL_NOTES.put(
      `/unfavorite/${id}?me=${me}&key=${key}&favorite_value=false`
    );

    if (response.status === 200) {
      infoMessage("Desfavoritado com sucesso!", 1500);
    } else if (response.status === 400) {
      errorMessage("Houve um erro ao desfavoritar esta nota!");
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
