import api from "./api";

interface SendCode{
    email:string;
}

export const sendCode = async (email:string):Promise<void> =>{
    try{
        const code: SendCode = {email}
        await api.post("/users/send-code",code);
        console.log("Codigo enviado")
    }catch(error){
        console.log("Erro ao enviar o código", error)
        throw error;
    }
}