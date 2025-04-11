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
import { HiCheck } from "react-icons/hi";

interface Props {
  children: React.ReactNode;
  languages: Language[];
  current: Language | undefined;
  onLanguageSelected: (language: Language) => void;
  className?: string;
}

export function LanguageChange({ children, languages, current, onLanguageSelected, className }: Props) {
  return (
    <Dialog id="languages">
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
        <DialogHeader className="p-6">
          <DialogTitle>Idiomas</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="p-6 pt-0 overflow-y-auto">
          {languages
            .sort((a, b) => a.language.localeCompare(b.language))
            .sort((a, b) => (a.language === current?.language ? -1 : 1))
            .map((language, i) => {
              return (
                <DialogClose asChild key={i}>
                  <button
                    type="button"
                    className="py-3 w-full text-left outline-none"
                    onClick={() => onLanguageSelected(language)}
                  >
                    <div className="w-full flex justify-between items-center">
                      <span>{language.language}</span>
                      {language.language === current?.language ? <HiCheck /> : <></>}
                    </div>
                  </button>
                </DialogClose>
              );
            })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
