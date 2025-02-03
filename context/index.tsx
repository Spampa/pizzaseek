'use client'

import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [chat, setChat] = useState<Array<any>>([])
    const [message, setMessage] = useState<string>("");

    return (
        <AppContext.Provider value={{
            chat,
            setChat,
            message,
            setMessage
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    return useContext(AppContext);
}