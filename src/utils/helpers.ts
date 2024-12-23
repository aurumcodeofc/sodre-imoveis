  export const formatCPF = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '').slice(0, 11); 
    return onlyNumbers
      .replace(/^(\d{3})(\d)/, '$1.$2') // Primeiro ponto
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3') // Segundo ponto
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4'); // Traço
  };

  export const validateCPF = (cpf: string): boolean => {
    const sanitizedCPF = cpf.replace(/\D/g, '');
    if (
      sanitizedCPF.length !== 11 ||
      /^(\d)\1+$/.test(sanitizedCPF) 
    ) {
      return false;
    }

 
  
    const calculateDigit = (cpf: string, factor: number): number => {
      let total = 0;
      for (let i = 0; i < factor - 1; i++) {
        total += parseInt(cpf[i]) * (factor - i);
      }
      const remainder = total % 11;
      return remainder < 2 ? 0 : 11 - remainder;
    };
  
    const firstDigit = calculateDigit(sanitizedCPF, 10);
    const secondDigit = calculateDigit(sanitizedCPF, 11);
    return (
      firstDigit === parseInt(sanitizedCPF[9]) &&
      secondDigit === parseInt(sanitizedCPF[10])
    );
  };

  export const formatCEP = (cep: string): string => {
    let cleanCEP = cep.replace(/\D/g, "");
    if (cleanCEP.length > 8) {
      cleanCEP = cleanCEP.substring(0, 8);
    }
    return cleanCEP;
  };

  export const applyCRECIMask = (value: string) => {
    let newValue = value.replace(/[^A-Za-z0-9]/g, '');
  
   
    if (newValue.length >= 3) {
      newValue = newValue.slice(0, 2) + '-' + newValue.slice(2, 7); 
    }
  
    return newValue.toUpperCase(); 
  };

 export const validateCRECI = (creci: string) => {
   
    const regex = /^[A-Z]{2}-\d{5}$/;
    if (!regex.test(creci)) {
      return "O CRECI deve ter o formato XX-XXXXX (ex: SP-12345).";
    }
  
    const validStates = [
      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];
  
    const state = creci.substring(0, 2); 
  
    if (!validStates.includes(state)) {
      return "O estado informado é inválido.";
    }
  
    return ""; 
  };