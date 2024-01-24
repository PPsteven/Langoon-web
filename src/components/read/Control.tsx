import type React from "react";
import {
  PlayCircleIcon,
  PlayPauseIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "../../utils/helper";
import { useState } from "react";

interface ButtonProps {
  status: string;
  // player: corePlayer;
}

const Buttons = (props: ButtonProps) => {
  return (
    <div className="flex flex-row justify-center">
      <button className="btn btn-circle btn-ghost bg-transparent">
        <BackwardIcon className="h-6 w-6 text-white" />
      </button>
      <button
        className="btn btn-circle btn-ghost bg-transparent"
        // onClick={() => {
        //   if (props.status === "play") {
        //     props.player.pause();
        //   } else if (props.status === "pause") {
        //     props.player.play();
        //   }
        // }}
      >
        {props.status == "play" ? (
          <PlayPauseIcon className="h-12 w-12 text-white" />
        ) : (
          <PlayCircleIcon className="h-12 w-12 text-white" />
        )}
      </button>
      <button className="btn btn-circle btn-ghost bg-transparent">
        <ForwardIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

// interface SliderProps {
//   onChange: (per: number) => void;
// }

const TimeLine = () => {
  const [value, setValue] = useState([0]);

  return (
    <div className="flex flex-col w-full my-0 gap-2">
      {/* <div className="text-white text-left">{formatTime(10)}</div> */}
      <Slider
        value={value}
        max={100}
        step={1}
        onValueChange={(e) => {
          setValue(e);
        }}
      />
    </div>
  );
};

export const Control: React.FC = () => {
  return (
    <div className="w-full h-20 fixed left-0 bottom-0 flex flex-col justify-center">
      <div className="w-full absolute left-0 top-0">
        <TimeLine />
      </div>
      <div className="flex justify-center items-center my-auto">
        <Buttons status="pause" />
      </div>
    </div>
  );
};
