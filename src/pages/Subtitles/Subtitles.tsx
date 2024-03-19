import type React from "react";

import { Text } from "@/components/read/Text";
import { Control } from "@/components/read/Control";

import usePlayer from "@/hooks/usePlayer";
import { PlayerContext, SearchContext } from "@/store";

import demoMp3 from "@/assets/demo.mp3"
import { Dict } from "@/components/read/Dict";
import { useState } from "react";


const urls = [demoMp3]

const App: React.FC = () => {
  const {sound, exposedData} = usePlayer(urls);
  const [search, setSearch] = useState<string>("");

  return (
    <PlayerContext.Provider value={{sound:sound, exposedData:exposedData}}>
      <SearchContext.Provider value={{search:search, setSearch:setSearch}}>
        {/* <Dict> */}
          <div className="w-3/4 ml-auto">
            <Text/>
          </div>
        {/* </Dict> */}
      </SearchContext.Provider>
      <Control/>
    </PlayerContext.Provider>
  );
};

export default App;
