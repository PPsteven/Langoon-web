import type React from "react";

import { Text } from "@/components/read/Text";
import { Control } from "@/components/read/Control";

import usePlayer from "@/hooks/usePlayer";
import { PlayerContext } from "@/store";

import demoMp3 from "@/assets/demo.mp3"


const urls = [demoMp3]

const App: React.FC = () => {
  const {sound, exposedData} = usePlayer(urls);

  return (
    <PlayerContext.Provider value={{sound:sound, exposedData:exposedData}}>
      <div className="w-1/2 mx-auto">
        <Text/>
      </div>
      <Control/>
    </PlayerContext.Provider>
  );
};

export default App;
