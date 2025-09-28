import type { ILogin, IRegist } from "../interface/interface";

const apiUrl = import.meta.env.VITE_API_URL;

export const postAuthorization = async (logAuthorization: ILogin) => {
    try {
        await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logAuthorization)
        })
    } catch (e) {
        console.error(e);
        return null
    }
}

export const postRegistration = async (useRegistration: IRegist) =>{
    try{
        await fetch(`${apiUrl}/create-client`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(useRegistration)
        })
    }catch (e) {
        console.error(e);
        return null
    }
}

export const checkLogin = async(login:string)  =>{
    try{
        const res = await fetch(`${apiUrl}/check-login?login=${login}`,{
            method: "GET",
            headers:{ "Content-Type": "application/json"},
        });
        if(res){
            return res.json();
        }
    }catch(e){
        console.error(e);
        return null
    }
}