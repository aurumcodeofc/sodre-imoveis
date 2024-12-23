
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const searchCep = async (cep: string): Promise<any> => {
    const formattedCEP = cep.replace(/\D/g, ''); 
    const url = `https://viacep.com.br/ws/${formattedCEP}/json/`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.erro) {
        throw new Error("CEP não encontrado");
      }
  
      return data; 
    } catch {
      throw new Error("Erro ao consultar o CEP");
    }
  };
  