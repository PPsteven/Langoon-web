import classNames from "classnames";
import demoSubtitles from "@/assets/demo.json";
import { useContext, useEffect, useMemo, useState } from "react";

import { PlayerContext } from "@/store";

import "./Text.css";
// import { useLoading } from "@/hooks/useFetch";
import { getTokenize } from "@/utils/api";
import { handleRespWithNotifySuccess } from "@/utils/handle_resp";
import type { Sentence, Token } from "@/types/nlp";
import { isWord } from "@/types/nlp";

interface WordProps {
  token: Token;
  onClick: (w: string) => void;
}

const Word = (props: WordProps) => {
  const { onClick, token } = props;

  const search = () => {
    onClick(token.text);
  };

  return (
    <div className="text-base font-sans">
      {isWord(token) ? (
        <button onClick={search}>
          <span
            className={classNames(
              "box-border border border-transparent rounded cursor-pointer",
              "hover:bg-accent hover:shadow-lg"
            )}
          >
            {token.text}
          </span>
        </button>
      ) : (
        <span>{token.text}</span>
      )}
    </div>
  );
};

interface SentProps {
  data: Sentence;
  isActive: boolean;
  rowNo: number;
  search: (s: string) => void;
}

const Sent = (props: SentProps) => {
  const { sound } = useContext(PlayerContext)!;
  const { search, data: sentenceData } = props;

  const skipToLine = () => {
    sound.seek(props.data.start);
  };

  const wordClick = (word: string) => {
    search(word);
  };

  return (
    <div className={"box-border line text-start"}>
      <div className="flex gap-1 items-end">
        <button
          onClick={skipToLine}
          className={classNames(
            "w-full flex flex-col p-3 rounded-sm",
            "hover:bg-base-200",
            props.isActive && "bg-base-200 active"
          )}
        >
          {sentenceData.tokens ? (
            <div
              id={"line" + props.rowNo}
              className={classNames("font-bold whitespace-pre flex flex-wrap")}
            >
              {sentenceData.tokens.map((token) => {
                return (
                  <>
                    <Word token={token} onClick={wordClick} />
                    <div>{token.whitespace}</div>
                  </>
                );
              })}
            </div>
          ) : (
            <h1 id={"line" + props.rowNo} className={classNames("font-bold")}>
              {sentenceData.text}
            </h1>
          )}
          <p className={classNames("text-xl text-muted-foreground mt-1")}>
            {sentenceData.translation}
          </p>
        </button>
      </div>
    </div>
  );
};

interface TextProps {
  search: (word: string) => void;
}

export const Text = (props: TextProps) => {
  const {
    exposedData: progress,
    sentences,
    setSentences,
    curSentenceId,
    setCurSentenceId
  } = useContext(PlayerContext);

  const lines = useMemo(() => {
    return demoSubtitles
      .map((line, id) => {
        return {
          ...line,
          text: line.text.trim(),
          id: id++,
          start: line.start / 1000000000,
          end: line.end / 1000000000,
          isSelected: false,
        } as Sentence;
      })
      .filter((line) => line.text !== "");
  }, []);

  useEffect(() => {
    const index = lines.findIndex((line) => {
      return line.start <= progress.seek && progress.seek <= line.end;
    });
    setCurSentenceId(index);
  }, [progress.seek, lines]);

  useEffect(() => {
    const activeDom = document.querySelector(`.active`);
    if (activeDom) {
      activeDom.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [curSentenceId]);

  useEffect(() => {
    // init sentences
    setSentences(lines);

    // remove empty lines
    const texts = lines.map((line) => line.text.trim());

    const handleTokenize = async () => {
      const resp = await getTokenize("en", texts);

      // load sentences
      handleRespWithNotifySuccess(resp, (data) => {
        const sentences: Sentence[] = data.map((line, i) => {
          return { ...lines[i], tokens: line };
        });
        setSentences(sentences);
      });
    };

    handleTokenize();
  }, [lines]);

  return (
    <div className="card h-full w-full max-w-xl bg-base-100">
      <div className="h-full flex flex-col overflow-y-auto">
        {(sentences || []).map((sentence, i) => (
          <Sent
            key={sentence.text + i}
            data={sentence}
            isActive={curSentenceId == i}
            rowNo={i}
            search={props.search}
          />
        ))}
      </div>
    </div>
  );
};
