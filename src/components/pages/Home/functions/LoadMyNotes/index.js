import { URL_NOTES } from "../../../../utilities/Api/basesUrl";

// Função que carrega as notas do usuário
// Recebe o parâmetro user que é o ID do usuário
// Recebe o parâmetro token que é o token jwt de autenticação do usuário que é passado na chave "key" na url
// Ao fazer o post, o id e o token jwt são validados no servidor. Caso não for válido, receberá o status 401 (Unauthorized) e será feito o logout do usuário, pois para o usuário fazer esta solicitação, deverá estar autenticado com um token jwt
export const LoadMyNotes = async (user, token, setData, handleLogout) => {
  try {
    const response = await URL_NOTES.post(`/my-notes?me=${user}&key=${token}`);
    if (response.status === 200) {
      const data = await response.data;
      setData(data);
    } else if (response.status === 401) {
      handleLogout();
    }
  } catch (err) {
    console.log(err);
  }
};
