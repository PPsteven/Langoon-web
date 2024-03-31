import type React from "react";
import { useState } from "react";
import { Text } from "@/components/read/Text";
import { Dict } from "@/components/read/Dict";
import { Control } from "@/components/read/Control";
import { Header } from "@/components/layout/Header";
import { PlayerContextProvider } from "@/store";

const App: React.FC = () => {
  const [searchWord, setSearchWord] = useState("");

  const search = (word: string) => {
    setSearchWord(word);
  };

  return (
    <div className="w-full h-screen">
      <PlayerContextProvider>
        <div className="h-full flex flex-col">
          <Header />
          <div className="w-full bg-white flex justify-center grow overflow-y-auto">
            <div className="w-1/2 flex justify-center">
              <Text search={search} />
            </div>
            <Dict word={searchWord} />
          </div>
          <Control />
        </div>
      </PlayerContextProvider>
    </div>
  );
};

export default App;
