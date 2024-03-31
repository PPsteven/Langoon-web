import { useEffect, useState } from "react";
import classNames from "classnames";
// import { getWord } from "@/utils/api";
// import { handleRespWithNotifySuccess } from "@/utils/handle_resp";
// import { WordDict } from "@/types/nlp";
import { X as CloseIcon } from "lucide-react";

interface DictPropsType {
  /** @name 分词单词*/
  word: string;
}

export const Dict = (props: DictPropsType) => {
  const [open, setOpen] = useState(false);
  const { word } = props;

  const close = () => {
    setOpen(false);
  };

  useEffect(() => {
    word && setOpen(true);
  }, [word]);

  return (
    <div
      className={classNames(
        "w-[300px] h-full fixed right-0 z-10 bg-white p-4",
        open ? "block" : "hidden"
      )}
    >
      <div className="flex flex-col">
        <h1 className="flex items-center text-xl font-bold p-2">
          <button onClick={close}>
            <CloseIcon />
          </button>
          词典
        </h1>
        <div className="card bg-base-100 p-2">
          <div className="card-title p-2">{word}</div>
        </div>
      </div>
    </div>
  );
};
