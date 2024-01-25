import type React from "react";
import { Media } from "@/components/read/Media";
import { Text } from "@/components/read/Text";
import { Control } from "@/components/read/Control";
import { Dict } from "@/components/read/Dict";
import usePlayer from "@/hooks/usePlayer";
import demoMp3 from "@/assets/Spirited Away.mp3"


const urls = [demoMp3]

const App: React.FC = () => {
  const {sound, exposedData} = usePlayer(urls);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-row bg-slate-500">
          <div className="w-1/4">
            <Media />
          </div>
          <div className="w-1/2 h-screen mt-0 pt-20 pb-40">
            <Text />
          </div>
          <div className="w-1/4">
            <Dict />
          </div>
        </div>
        <Control player={sound} state={exposedData}/>
      </div>
    </>
  );
};

export default App;
