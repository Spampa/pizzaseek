'use client'

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"

import { Send } from "lucide-react";
import { useAppContext } from "@/context";
import { useCallback, useEffect, useState } from "react";

//services
import { fetchAIStream } from "../services/apiClient";

export default function Textbox() {
    const { chat, setChat, setMessage } = useAppContext();
    const [input, setInput] = useState<string>("");
    const [send, setSend] = useState<boolean>(false)

    const streamHandler = useCallback(async (input: string, model: string) => {
        try {
            const stream = await fetchAIStream(input, model);
            if (!stream) return;

            const reader = stream.getReader();
            const decoder = new TextDecoder();

            let partialResponse = "";
            let isThinking = true;
            let isDone = false;

            while (!isDone) {
                const { value } = await reader.read();

                const chunk = JSON.parse(decoder.decode(value, { stream: true }));
                isDone = chunk.done;

                partialResponse += chunk.response;

                if (partialResponse.includes("</think>")) {
                    isThinking = false;
                    partialResponse = "";
                }
                if (!isThinking) {
                    setMessage(partialResponse);
                }
            }

            setMessage("");
            setChat([...chat, { username: "AI", message: partialResponse }]);
        }
        catch (error) {
            console.error("Error: ", error);
        }
    }, [setMessage, setChat, chat]);

    useEffect(() => {
        if (send) {
            streamHandler(input, "deepseek-r1:1.5b");
            setInput("");
            setSend(false);
        }
    }, [send, input, streamHandler])

    function sendHandler() {
        if (input.trim() !== "") {
            setChat([...chat, { username: "User", message: input }]);
            setSend(true)
        }
    }

    return (
        <div className="p-2 rounded-xl text-secondary bg-foreground flex flex-col gap-2">
            <Textarea
                placeholder="Chiedi qualcosa a Pizza Seek"
                className="resize-none border-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex flex-row place-content-end">
                <Button variant="ghost" size="icon" onClick={() => sendHandler()}>
                    <Send />
                </Button>
            </div>
        </div>

    )
}