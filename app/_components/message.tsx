interface MessageProps {
    isAI: boolean,
    text: string
}

export default function Message({isAI = false, text} : MessageProps) {
    return(
        <div className={`w-2/3 flex flex-col gap-2 rounded-md p-3 text-secondary font-medium ${isAI ? 'bg-primary' : 'bg-foreground'}`}>
            <h1 className="font-bold">{isAI ? "Pizza Seek" : "User"}</h1>
            <p>{text}</p>
        </div>   
    )
}