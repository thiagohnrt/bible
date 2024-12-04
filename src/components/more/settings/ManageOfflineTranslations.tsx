import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BibleContext } from "@/providers/bibleProvider";
import { api, Translation } from "@/services/api";
import React, { useContext, useEffect, useState } from "react";
import { HiCheck, HiOutlineMinusCircle } from "react-icons/hi";
import { CgSpinner } from "react-icons/cg";
import { RiErrorWarningLine } from "react-icons/ri";
import { db } from "@/database/bibleDB";

interface Props {
  children: React.ReactNode;
}

export function ManageOfflineTranslations({ children }: Props) {
  const { translationsOffline, setTranslationsOffline } = useContext(BibleContext);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const iconSize = 20;

  useEffect(() => {
    (async () => {
      setTranslations(await api.getTranslations());
    })();
  }, []);

  const onDeleteTranslation = (transition: Translation) => {
    const msg = `Tem certeza que deseja remover essa versão offline?\n\n${transition.short_name} - ${transition.full_name}`;
    if (confirm(msg)) {
      db.deleteTranslation(transition.identifier, setTranslationsOffline);
    }
  };

  return (
    <Dialog id="manage-offline-translations">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>Versões Offline</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <TranslationGroup
            label="Baixado"
            icon={<HiOutlineMinusCircle size={iconSize} />}
            data={translations.filter((t) => translationsOffline[t.identifier] === "downloaded")}
            onTranslationClick={onDeleteTranslation}
          />
          <TranslationGroup
            label="Baixando"
            icon={<CgSpinner className="animate-spin" size={iconSize} />}
            data={translations.filter((t) => translationsOffline[t.identifier] === "downloading")}
            onTranslationClick={() => {}}
          />
          <TranslationGroup
            label="Falha ao Baixar"
            icon={<RiErrorWarningLine size={iconSize} />}
            data={translations.filter((t) => translationsOffline[t.identifier] === "downloadFailed")}
            onTranslationClick={onDeleteTranslation}
          />
          <TranslationGroup
            label="Excluindo"
            icon={<CgSpinner className="animate-spin" size={iconSize} />}
            data={translations.filter((t) => translationsOffline[t.identifier] === "deleting")}
            onTranslationClick={() => {}}
          />
          <TranslationGroup
            label="Falha ao Excluir"
            icon={<RiErrorWarningLine size={iconSize} />}
            data={translations.filter((t) => translationsOffline[t.identifier] === "deleteFailed")}
            onTranslationClick={onDeleteTranslation}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface TranslationGroupProps {
  label: string;
  data: Translation[];
  icon: React.ReactNode;
  onTranslationClick: (translation: Translation) => void;
}

function TranslationGroup({ label, data, icon, onTranslationClick }: TranslationGroupProps) {
  if (!data.length) {
    return <></>;
  }
  return (
    <div className="mb-4">
      <h2 className="px-6 text-lg font-bold mb-2">{label}</h2>
      {data.map((translation, i) => {
        return (
          <div
            className="flex items-center px-6 py-2 active:bg-neutral-100 dark:active:bg-neutral-900 transition-colors"
            onClick={() => onTranslationClick(translation)}
            key={i}
          >
            <div className="flex-auto flex flex-col text-left">
              <span>{translation.short_name}</span>
              <small className="opacity-50">{translation.full_name}</small>
            </div>
            <div className="flex-initial flex justify-center">{icon}</div>
          </div>
        );
      })}
    </div>
  );
}
