import { createContext, useState } from "react";
import type { State } from "@/hooks/usePlayer";
import type { Sentence } from "@/types/nlp";
import usePlayer from "@/hooks/usePlayer";
import demoMp3 from "@/assets/demo.mp3";

export const PlayerContext = createContext<{
  sound: Howl;
  exposedData: State;
  sentences: Sentence[];
  setSentences: (value: Sentence[]) => void;
  curSentenceId: number;
  setCurSentenceId: (value: number) => void;
}>({} as any);

const urls = [demoMp3];

export const PlayerContextProvider = (props: any) => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  
  // 当前播放的句子 id
  const [curSentenceId, setCurSentenceId] = useState(-1);

  const { children = null } = props;
  const { sound, exposedData } = usePlayer(urls);
  console.log("sound", sentences);

  return (
    <PlayerContext.Provider
      value={{
        sound: sound,
        exposedData: exposedData,
        sentences,
        setSentences,
        curSentenceId,
        setCurSentenceId,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};
