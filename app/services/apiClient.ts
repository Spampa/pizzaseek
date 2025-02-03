export async function fetchAIStream(prompt: string, model:string) {
    const response = await fetch(`/api/ollama`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model,
            prompt
        })
    })

    if(response.status === 401){
        await setToken();
        return fetchAIStream(prompt, model);
    }
    else if(response.status === 400 || response.status === 500){
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    return response?.body;
}

export async function setToken() {
    fetch(`/api/token`, {
        method: "POST"
    });
}