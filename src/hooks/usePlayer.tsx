import { useEffect, useMemo, useState } from "react";
import { Howl } from "howler";
import { addHowlerListener } from "@/utils/howler";

export interface PlayerProps {
  urls: string[];
  volume?: number;
  rate?: number;
}

export type State = {
  playIndex: number;
  seek: number;
  duration: number;
  percent: number;
  status: "play" | "pause" | "loading";
  err?: string;
};

export default function usePlayer(urls: string[]) {
  const [state, setState] = useState<State>({
    playIndex: 0,
    seek: 0,
    duration: 0,
    percent: 0,
    status: "pause",
    err: "",
  });

  console.log('urls', urls)


  useEffect(() => {
    const sound = new Howl({ 
      src: urls, 
      html5: true, 
      preload: true // Donwload file to improve performance true 
    })

    if (!sound) return

    const unListens: Array<() => void> = [];
    unListens.push(
      addHowlerListener(sound, "play", () => {
        console.log("play");
        setState((state) => ({
          ...state,
          status: "play",
          err: undefined,
          duration: sound.duration(),
        }));
      })
    );
    unListens.push(
      addHowlerListener(sound, "pause", () => {
        console.log("pause");
        setState((state) => ({ ...state, status: "pause" }));
      })
    );
    unListens.push(
      addHowlerListener(sound, "loaderror", () => {
        console.log("load error");
        setState((state) => ({ ...state, status: "pause", err: "Load error" }));
      })
    );
    unListens.push(
      addHowlerListener(sound, "playerror", () => {
        console.log("play error");
        setState((state) => ({ ...state, status: "pause", err: "Play error" }));
      })
    );

    return () => {
      setState((state) => ({ ...state, status: "pause" }));
      unListens.forEach((unListen) => unListen());
      sound.unload();
    };
  }, [urls, state]);

  return { sound, state };
}

export default function usePlayer() {
  return player
}

// player.play()
// player.pause()
// state.status == "pause" | "playing"