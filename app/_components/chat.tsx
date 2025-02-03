'use client'

import { useAppContext } from "@/context"
import Message from "./message"
import { useEffect } from "react";

export default function Chat() {
    const { chat, message } = useAppContext();

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [message]);

    return (
        <div className="flex flex-col gap-2 w-full max-h-full overflow-y-auto p-1">
            {
                chat.map((e: {username: string, message: string}, index: number) => {
                    return e.username == "AI" ? (
                        <div key={index} className="flex place-content-start">
                            <Message isAI={true} text={e.message} />
                        </div>
                    ) : (
                        <div key={index} className="flex place-content-end">
                            <Message isAI={false} text={e.message} />
                        </div>
                    )
                })
            }
            {
                message != "" ?

                    < div className="flex place-content-start">
                        <Message isAI={true} text={message} />
                    </div>
                    :
                    <></>
            }

        </div >
    )
}