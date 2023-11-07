import { URL_NOTES } from "../../../utilities/Api/basesUrl";
import { alertMessage, successMessage } from "../../../utilities/toastMessages";

// Rota POST para editar uma nota
// Parâmetros id = id da nota; me = id do usuário; key = token jwt; title e content são os states

export const SendDataForm = async (event, id, me, key, title, content) => {
  event.preventDefault();
  if (!title || !content) {
    alertMessage("Os campos não podem ficar vazios!");
    return;
  }

  try {
    const body = { title, content };
    const response = await URL_NOTES.post(
      `/edit/${id}?me=${me}&key=${key}`,
      body
    );
    if (response.status === 200) {
      successMessage("Nota editada com sucesso!", 1500);
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};
