import { Language } from "@/services/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Dispatch, SetStateAction } from "react";

interface Props {
  children: React.ReactNode;
  languages: Language[];
  onLanguageSelected: Dispatch<SetStateAction<Language | undefined>> | (() => void);
  className?: string;
}

export function LanguageChange({ children, languages, onLanguageSelected, className }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0">
        <DialogHeader className="p-6">
          <DialogTitle>Linguages</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-0 overflow-y-auto">
          {languages.map((language, i) => {
            return (
              <DialogClose asChild key={i}>
                <button
                  type="button"
                  className="py-3 w-full text-left outline-none"
                  onClick={() => onLanguageSelected(language)}
                >
                  {language.language}
                </button>
              </DialogClose>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
