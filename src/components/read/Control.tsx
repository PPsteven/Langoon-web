import {
  PlayCircleIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "../../utils/helper";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "@/store";

const Buttons = () => {
  const { sound: player, exposedData: state } = useContext(PlayerContext)!;

  return (
    <div className="flex flex-row justify-center">
      <button className="btn btn-circle btn-ghost bg-transparent">
        <BackwardIcon className="h-6 w-6 text-white" />
      </button>
      <button
        className="btn btn-circle btn-ghost bg-transparent"
        onClick={() => {
          if (state.status === "play") {
            player.pause();
          } else if (state.status === "pause") {
            player.play();
          }
        }}
      >
        {state.status == "play" ? (
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
    // 注意: 这里不能添加 isDragging 依赖, 不然进度条在isDragging变动的时候会发生突然的跳变。
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seek, duration]);

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

export const Control = () => {
  const { sound, exposedData: state} = useContext(PlayerContext)!;

  const onChange = (val: number) => {
    sound.seek((val / 100) * state.duration);
  };

  return (
    <div className="w-full h-18 fixed left-0 bottom-0 flex flex-col justify-center">
      <div className="w-full h-4 relative left-0 -top-2 justify-center">
        <Progress
          onChange={onChange}
          seek={state.seek}
          duration={state.duration}
        />
      </div>
      <div className="flex justify-center items-center my-auto">
        <Buttons/>
      </div>
    </div>
  );
};
