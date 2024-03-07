import classNames from "classnames";
import demoScript from "@/assets/scent_of_a_woman.json";
import { useEffect, useMemo, useState } from "react";
import { LineObj } from "@/store/media";

interface LineProps {
  obj: LineObj;
  isActive: boolean;
  lineNo: number;
}

const Line = (props: LineProps) => {
  return (
    <div className={"box-border px-12 flex flex-col gap-2"}>
      <span
        className={classNames(
          "font-bold text-2xl text-start",
          props.isActive ? "text-white shadow-xl active" : "text-gray-500"
        )}
        id={"line" + props.lineNo}
      >
        {props.obj.raw}
      </span>
      <span
        className={classNames(
          "text-xl text-start",
          props.isActive ? "text-white shadow-xl active" : "text-gray-500"
        )}
      >
        {props.obj.translation}
      </span>
    </div>
  );
};

export interface TextProps {
  seek: number;
}

export const Text = (props: TextProps) => {
  const [curIndex, setCurIndex] = useState(-1);

  const lines = useMemo(() => {
    return demoScript.map((line) => {
      return {
        ...line,
        start: line.start / 1000000000,
        end: line.end / 1000000000,
        isSelected: false,
      };
    });
  }, []);

  useEffect(() => {
    const index = lines.findIndex((line) => {
      return line.start <= props.seek && props.seek <= line.end;
    });
    setCurIndex(index);
  }, [props.seek]);

  useEffect(() => {
    const active = document.querySelector(`.active`);
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [curIndex]);

  return (
    <div className="w-full h-full box-border overflow-y-auto bg-none">
      <div className="flex flex-col gap-5 ml-4">
        {lines.map((line, i) => {
          return (
            <Line key={i} obj={line} isActive={curIndex == i} lineNo={i} />
          );
        })}
      </div>
    </div>
  );
};
