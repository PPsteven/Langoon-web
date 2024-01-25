import {
  PlayCircleIcon,
  PauseIcon,
  BackwardIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "../../utils/helper";
import { State } from "@/hooks/usePlayer";

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
            console.log("pause");
            props.player.pause();
          } else if (props.status === "pause") {
            console.log("play");
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

interface TimeLineProps {
  seek: number;
  duration: number;
  onChange: (per: number) => void;
}

const TimeLine = (props: TimeLineProps) => {
  return (
    <div className="flex flex-col w-full my-0 gap-2">
      <div className="absolute left-0 -top-12 text-white text-left">{formatTime(props.seek)}</div>
      <Slider
        value={[props.seek / props.duration * 100]}
        max={100}
        step={1}
        onValueChange={(e) => {
          props.onChange(e[0]/100);
        }}
        // onValueCommit={(e) => {
        //   console.log(e);
        //   // props.onChange(e[0]/100);
        // }}
      />
    </div>
  );
};

interface ControlProps {
  player: Howl;
  state: State;
}

export const Control = (props: ControlProps) => {
  const onChange = (per: number) => {
    props.player.seek(per * props.state.duration);
  };

  return (
    <div className="w-full h-20 fixed left-0 bottom-0 flex flex-col justify-center">
      <div className="w-full absolute left-0 top-0">
        <TimeLine onChange={onChange} seek={props.state.seek} duration={props.state.duration}/>
      </div>
      <div className="flex justify-center items-center my-auto">
        <Buttons player={props.player} status={props.state.status} />
      </div>
    </div>
  );
};
