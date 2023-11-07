import { URL_NOTES } from "../../../utilities/Api/basesUrl";
import { errorMessage } from "../../../utilities/toastMessages";

// Função que carrega a nota do usuário atrávés do id
// Recebe o parâmetro id que é o id da nota que é pego automaticamente com o useParams do react-router-dom
// Recebe o parâmetro me que é o id do usuário no banco de dados
// Recebe o parâmetro key que é o token jwt de autenticação do usuário que é passado na chave "key" na url
// Recebe o parâmetro setData que é o state que setamos no componente
// Ao fazer o GET, o id, o me e o token JWT são validados no servidor.
export const LoadNote = async (id, me, key, setData) => {
  try {
    const response = await URL_NOTES.get(`/note/${id}?me=${me}&key=${key}`);
    if (response.status === 200) {
      const data = await response.data;
      setData(data);
    } else if (response.status === 400) {
      errorMessage("Houve um erro ao carregar sua Nota!");
      return;
    }
  } catch (err) {
    console.log(err);
  }
};
