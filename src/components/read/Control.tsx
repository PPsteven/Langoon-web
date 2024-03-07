import {
  PlayCircleIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "../../utils/helper";
import { State } from "@/hooks/usePlayer";
import { useEffect, useState } from "react";

interface ButtonProps {
  status: string;
  player: Howl;
}

const Buttons = (props: ButtonProps) => {
  return (
    <div className="flex flex-row justify-center">
      <button className="btn btn-circle btn-ghost bg-transparent">
        <BackwardIcon className="h-6 w-6 text-white" />
      </button>
      <button
        className="btn btn-circle btn-ghost bg-transparent"
        onClick={() => {
          if (props.status === "play") {
            props.player.pause();
          } else if (props.status === "pause") {
            props.player.play();
          }
        }}
      >
        {props.status == "play" ? (
          <PauseIcon className="h-12 w-12 text-white" />
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

interface ProgressProps {
  seek: number;
  duration: number;
  onChange: (per: number) => void;
}

const Progress = ({ seek, duration, onChange }: ProgressProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isDragging) return;
    setValue((seek / duration) * 100);
  }, [seek, duration, isDragging]);

  return (
    <div className="w-full h-full flex flex-col justify-center cursor-pointer">
      <div className="w-full absolute left-0 -top-5 text-white text-left flex flex-row justify-between">
          <span>
            {formatTime(seek)}
          </span>
          <span>
            {formatTime(duration)}
          </span>
        </div>
      <Slider
        className="media-slider h-full"
        value={[value]}
        max={100}
        step={1}
        onValueChange={(e) => {
          setValue(e[0]);
          setIsDragging(true);
        }}
        onValueCommit={(e) => {
          onChange(e[0]);
          setIsDragging(false);
        }}
      />
    </div>
  );
};

interface ControlProps {
  player: Howl;
  state: State;
}

export const Control = (props: ControlProps) => {
  const onChange = (val: number) => {
    props.player.seek((val / 100) * props.state.duration);
  };

  return (
    <div className="w-full h-18 fixed left-0 bottom-0 flex flex-col justify-center">
      <div className="w-full h-4 relative left-0 -top-2 justify-center">
        <Progress
          onChange={onChange}
          seek={props.state.seek}
          duration={props.state.duration}
        />
      </div>
      <div className="flex justify-center items-center my-auto">
        <Buttons player={props.player} status={props.state.status} />
      </div>
    </div>
  );
};
