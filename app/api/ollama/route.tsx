import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { prompt, model } = await req.json();

    if(!prompt || prompt == "") {
        return NextResponse.json({error: 400, message: "Prompt is Required!"}, {status: 400})
    }
    if(!model || model == ""){
        return NextResponse.json({error: 400, message: "Model is Required!"}, {status: 400})
    }

    try {
        const stream = new ReadableStream({
            async start(controller) {
                const response = await fetch(`${process.env.OLLAMA_URL}/generate`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model,
                        prompt
                    })
                });

                if(!response.body){
                    throw new Error("Void Response");
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let isDone = false;

                while (!isDone) {
                    const { value } = await reader.read();

                    const chunk = JSON.parse(decoder.decode(value, { stream: true }));
                    isDone = chunk.done;

                    controller.enqueue(new TextEncoder().encode(JSON.stringify(chunk)));
                }

                controller.close();
            },
        });

        return new Response(stream, {
            headers: { "Content-Type": "application/json" },
        });
    }
    catch(error){
        NextResponse.json({error: 500, message: error}, {status: 500});
    }

}