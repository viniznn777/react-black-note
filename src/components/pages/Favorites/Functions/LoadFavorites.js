import { URL_NOTES } from "../../../utilities/Api/basesUrl";
import { errorMessage } from "../../../utilities/toastMessages";

// Função para carregar carregar todas as notas favoritas de um usuário
// Parâmetros me, key e setData como um state

export const LoadFavorites = async (me, key, setData) => {
  try {
    const response = await URL_NOTES.get(`/favorites?me=${me}&key=${key}`);
    if (response.status === 200) {
      const data = await response.data;
      setData(data);
    } else if (response.status === 400) {
      errorMessage("Houve um erro ao carregar suas notas!");
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
