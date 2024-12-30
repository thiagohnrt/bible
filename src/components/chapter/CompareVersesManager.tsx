import { db } from "@/database/bibleDB";
import { BibleContext } from "@/providers/bibleProvider";
import { Language, Translation } from "@/services/api";
import { Reorder } from "motion/react";
import { forwardRef, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { HiOutlineMinusCircle } from "react-icons/hi";
import { IoReorderThreeOutline } from "react-icons/io5";
import { DialogConfirm } from "../root/DialogConfirm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CompareVersesVersions } from "./CompareVersesVersions";

interface Props {
  children: ReactNode;
  languages: Language[];
  onClose?: () => void;
}

export const CompareVersesManager = forwardRef<HTMLDivElement, Props>(
  ({ children, languages, onClose }: Props, ref) => {
    const [translations, setTranslations] = useState<Translation[]>([]);
    const { translation: translationCurrent } = useContext(BibleContext);

    const renderTranslations = useCallback(() => {
      const allTranslations = languages.map((language) => language.translations).flat();

      const translationsToCompare = db.getTranslationsToCompare();
      const translations = allTranslations
        .filter((translation) => translationsToCompare.includes(translation.identifier))
        .sort((a, b) => translationsToCompare.indexOf(a.identifier) - translationsToCompare.indexOf(b.identifier));

      setTranslations(translations);
    }, [languages]);

    useEffect(() => {
      renderTranslations();
    }, [languages, renderTranslations]);

    useEffect(() => {
      if (translations.length > 0) {
        db.setTranslationsToCompare(translations.map((t) => t.identifier));
      }
    }, [translations]);

    return (
      <Dialog id="manage-versions-to-compare" onOpen={renderTranslations} onClose={onClose} ref={ref}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
          <DialogHeader className="p-6 pb-3">
            <DialogTitle>Versões para Comparar</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="pt-0 flex-1 overflow-y-auto">
            <Reorder.Group values={translations} onReorder={setTranslations}>
              {translations.map((translation) => (
                <Reorder.Item key={translation.identifier} value={translation}>
                  <div className="flex items-center pl-6 my-1 gap-2">
                    <IoReorderThreeOutline />
                    <div className="flex-1 flex items-center gap-2">
                      <div>{translation.short_name}</div>
                      <small className="opacity-50">{translation.full_name}</small>
                    </div>
                    {translation.identifier !== translationCurrent?.identifier ? (
                      <DialogConfirm
                        message={
                          <>
                            <span>Deseja remover essa versão na comparação?</span>
                            <span className="flex items-center gap-2">
                              <span>{translation.short_name}</span>
                              <span className="opacity-50">{translation.full_name}</span>
                            </span>
                          </>
                        }
                        onConfirm={() =>
                          setTranslations((prev) => prev.filter((t) => t.identifier !== translation.identifier))
                        }
                        btnAction="destructive"
                      >
                        <div className="px-6 py-4 cursor-pointer">
                          <HiOutlineMinusCircle />
                        </div>
                      </DialogConfirm>
                    ) : (
                      <div className="min-h-12"></div>
                    )}
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
          <CompareVersesVersions languages={languages} onClose={renderTranslations}>
            <DialogFooter className="p-6 border-t flex flex-row items-center justify-center sm:justify-center gap-2 cursor-pointer select-none active:bg-neutral-100 dark:active:bg-neutral-900 transition-colors">
              <FiPlus size={20} />
              <span>Adicionar Versão</span>
            </DialogFooter>
          </CompareVersesVersions>
        </DialogContent>
      </Dialog>
    );
  }
);
CompareVersesManager.displayName = "CompareVersesManager";
