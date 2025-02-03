'use client'

import Textbox from "../_components/textbox";
import Chat from "../_components/chat";
import Header from "../_components/header";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="container mx-auto mt-20 w-full md:w-2/3 xl:w-1/2 mb-[182px]">
        <Chat />
      </div>
      <div className="fixed bottom-0 p-6 flex place-content-center bg-secondary rounded-t-xl w-full">
        <div className="w-full md:w-2/3 xl:w-1/2">
          <Textbox />
        </div>
        
      </div>
    </main>
  );
}
