import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
  version: string;
  setVersion: Dispatch<SetStateAction<string>> | (() => void);
}

export const BibleContext = createContext<Props>({
  version: "nvi",
  setVersion: () => null,
});
