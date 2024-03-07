import { useEffect, useRef, useState } from "react";
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
    status: "loading",
    err: "",
  });
  const soundRef = useRef<Howl | undefined>(undefined);
  const intervalRef = useRef<number>(0);

  const resetInterval = () => {
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      const seek = soundRef.current?.seek() || 0;
      const percent = (seek / soundRef.current!.duration()) * 100 || 0;
      setState((prev) => ({ ...prev, seek: seek, percent: percent }));
    }, 200);
  };

  useEffect(() => {
    if (!soundRef.current) {
      soundRef.current = new Howl({
        src: urls,
        html5: true,
        preload: true, // Donwload file to improve performance true
      });
    }

    const unListens: Array<() => void> = [];

    unListens.push(
      addHowlerListener(soundRef.current, "play", () => {
        console.log("play");
        resetInterval();
        setState((state) => ({
          ...state,
          status: "play",
          err: undefined,
          duration: soundRef.current!.duration(),
        }));
      })
    );
    unListens.push(
      addHowlerListener(soundRef.current, "pause", () => {
        console.log("pause");
        console.log("sound", intervalRef.current);
        clearInterval(intervalRef.current);
        setState((state) => ({ ...state, status: "pause" }));
      })
    );
    unListens.push(
      addHowlerListener(soundRef.current, "seek", () => {
        console.log("seek");
        resetInterval();
      })
    );
    unListens.push(
      addHowlerListener(soundRef.current, "load", () => {
        console.log("load");
      })
    );
    unListens.push(
      addHowlerListener(soundRef.current, "loaderror", () => {
        console.log("load error");
        setState((state) => ({ ...state, status: "pause", err: "Load error" }));
      })
    );
    unListens.push(
      addHowlerListener(soundRef.current, "playerror", () => {
        console.log("play error");
        setState((state) => ({ ...state, status: "pause", err: "Play error" }));
      })
    );

    return () => {
      setState((state) => ({ ...state, status: "pause" }));
      unListens.forEach((unListen) => unListen());
      soundRef.current!.unload();
    };
  }, [urls]);

  return { sound: soundRef.current!, exposedData: state };
}
