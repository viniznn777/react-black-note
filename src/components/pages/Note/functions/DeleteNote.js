import { URL_NOTES } from "../../../utilities/Api/basesUrl";
import { errorMessage, successMessage } from "../../../utilities/toastMessages";

// Função para deletar uma nota
// Recebe os parâmetros id, me e key como as outras funções
// Ao ter o status 200, será redirecionado o usuário para a página inicial
export const DeleteNote = async (id, me, key) => {
  try {
    const response = await URL_NOTES.delete(
      `/delete-note/${id}?me=${me}&key=${key}`
    );

    if (response.status === 200) {
      successMessage("Nota deletada com sucesso!");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  } catch (err) {
    console.log(err);
    errorMessage("Houve um erro ao deletar esta nota!");
  }
};
