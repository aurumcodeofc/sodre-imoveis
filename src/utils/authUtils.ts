import axios from "axios";
export const fetchUserSession = async (token: string) => {
    try {
      const response = await axios.get<User>('https://sodre-imoveis-production.up.railway.app/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        setUser(response.data); // Atualiza o estado com os dados do usuário
      }
    } catch (error) {
      console.error("Erro ao validar sessão:", error);
      logout();
    } finally {
      setIsLoading(false); // Marca como carregado independentemente do sucesso ou erro
    }
  };