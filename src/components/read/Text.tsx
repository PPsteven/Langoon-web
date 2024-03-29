import classNames from "classnames";
import demoSubtitles from "@/assets/demo.json";
import { useContext, useEffect, useMemo, useState } from "react";

import { PlayerContext, SearchContext } from "@/store";

import "./Text.css";
// import { useLoading } from "@/hooks/useFetch";
import { getTokenize } from "@/utils/api";
import { handleRespWithNotifySuccess } from "@/utils/handle_resp";
import { Sentence, Token, isWord } from "@/types/nlp";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Dict } from "./Dict";

interface SentProps {
  data: Sentence;
  isActive: boolean;
  rowNo: number;
}

const Word = (props: {token: Token}) => {
  const { setSearch } = useContext(SearchContext)!;

  const handleSearch = () => {
    setSearch(props.token.text);
  }

  return (
    <>
      {
      isWord(props.token) ?
        <button onClick={handleSearch}>
          <span className={classNames(
            "box-border border border-transparent",
            "hover:border-border hover:border-dashed hover:rounded hover:bg-card",
            "hover:decoration-red-500 hover:text-red-500",
            "cursor-pointer")}>
            {props.token.text}
          </span>
        </button>
         :
        <>{props.token.text}</>
      }
    </>
  )
}

const Sent = (props: SentProps) => {
  const { sound } = useContext(PlayerContext)!;

  const skipToLine = () => {
    sound.seek(props.data.start);
  };

  return (
    <div className={"box-border line text-start"}>
      <div className="flex gap-1 items-end">
        <button onClick={skipToLine} 
        className={classNames("w-full h-full flex flex-col p-3 rounded-lg border",
        props.isActive && "bg-muted active",
      )}>
        {props.data.tokens ?
          <div id={"line" + props.rowNo}
            className={classNames("font-bold")}
          >
            {props.data.tokens.map((token) => {
              return (
                <>
                  <Word token={token}/>
                  {token.whitespace}
                </>
              )
            })}
          </div> :
          <h1 id={"line" + props.rowNo}
            className={classNames("font-bold")}
          >
            {props.data.text}
          </h1>
        }
        <p
          className={classNames("text-xs text-muted-foreground mt-1")}
        >
          {props.data.translation}
        </p>
      </button>
      </div>
    </div>
  );
};

export const Text = () => {
  const {exposedData: state} = useContext(PlayerContext)!;

  const [curIndex, setCurIndex] = useState(-1);
  const [sentences, setSentences] = useState<Sentence[]>([]);

  const lines = useMemo(() => {
    return demoSubtitles.map((line, id) => {
      return {
        ...line,
        id: id++,
        start: line.start / 1000000000,
        end: line.end / 1000000000,
        isSelected: false,
      } as Sentence;
    });
  }, []);

  useEffect(() => {
    const index = lines.findIndex((line) => {
      return line.start <= state.seek && state.seek <= line.end;
    });
    setCurIndex(index);
  }, [state.seek, lines]);

  useEffect(() => {
    const active = document.querySelector(`.active`);
    if (active) {
      active.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [curIndex]);

  useEffect(() => {
    // init sentences
    setSentences(lines);

    const texts = lines.map((lines) => lines.text);

    const handleTokenize = async () => {
      const resp = await getTokenize("en", texts);

      // load sentences
      handleRespWithNotifySuccess(resp, (data) => {
        const sentences: Sentence[] = data.map((line, i) => {
          return {...lines[i], tokens: line};
        })
        setSentences(sentences);
      });
    };

    handleTokenize();
  }, [lines]);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] rounded-lg border"
    >
      <ResizablePanel defaultSize={75}>
    <div className="w-full h-screen pb-20 pr-20">
      <div className="w-full h-full box-border overflow-y-auto bg-none">
        <div className="flex flex-col gap-2 ml-4">
          {sentences.map((row, i) => (
            <Sent key={i} data={row} isActive={curIndex == i} rowNo={i} />
          ))}
        </div>
      </div>
    </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25}>
        <div className="h-full p-6">
          <Dict />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>

  );
};
