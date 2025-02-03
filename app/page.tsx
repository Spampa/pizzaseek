'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { setToken } from "./services/apiClient";

import Image from "next/image";

export default function Home(){
    const router = useRouter();

    async function buttonHandler() {
        await setToken();
        router.push('/chat');
    }

    return(
        <div className="h-screen flex flex-col place-content-center items-center bg-secondary">
            <div className="grid grid-cols-2 text-primary items-center place-content-center text-center">
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold">Pizza Seek</h1>
                    <p className="text-base md:text-xl font-normal">L&apos;AI che non tiene traccia dei tuoi dati😊</p>
                </div>
                <Image src={"/logo.png"} width={400} height={400} alt="logo" priority/>
            </div>
            
            <Button onClick={() => buttonHandler()}>
                Inizia a Chattare
            </Button>
        </div>
    )
}