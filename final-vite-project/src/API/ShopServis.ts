export const postAuthorization = async (logAuthorization) => {
    try {
        await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logAuthorization)
        })
    } catch (e) {
        console.error(e);
        return null
    }
}

export const postRegistration = async (useRegistration) =>{
    try{
        await fetch("http://localhost:5000/create-client",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(useRegistration)
        })
    }catch (e) {
        console.error(e);
        return null
    }
}