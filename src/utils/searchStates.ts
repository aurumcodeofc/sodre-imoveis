export const searchStates = async (): Promise<string[]> => {
    try {
      const response = await fetch("https://brasilapi.com.br/api/ibge/uf/v1");
      const data = await response.json();

      const siglas = data.map((estado: { sigla: string }) => estado.sigla);
      
  
      return siglas;
    } catch (error) {
      console.error("Erro ao carregar estados:", error);
      return [];
    }
  };
  