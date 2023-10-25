import { URL_NOTES } from "../../utilities/Api/basesUrl";
import { alertMessage, successMessage } from "../../utilities/toastMessages";

// Função para enviar a nota criada para o servidor
export default async function SendData(
  event,
  title,
  content,
  setTitle,
  setContent,
  author,
  me,
  key
) {
  event.preventDefault();
  if (!title || !content) {
    alertMessage("Todos os campos devem ser preenchidos!");
    return;
  }
  try {
    const body = {
      title,
      content,
      author,
    };
    // Chave "me" deve conter o id de usuário, e chave key deve conter o token JWT retornado pelo servidor ao fazer o login
    const response = await URL_NOTES.post(`/new?me=${me}&key=${key}`, body);
    if (response.status === 200) {
      setTitle("");
      setContent("");
      successMessage("Notas criada com sucesso!");
    }
  } catch (err) {
    console.log(err);
  }
}
