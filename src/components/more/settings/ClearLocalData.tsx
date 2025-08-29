import { DialogConfirm } from "@/components/root/DialogConfirm";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/database/bibleDB";
import { DBInfo } from "@/database/indexedDB";
import React, { useEffect, useState } from "react";
import { CleaningUpLocalData } from "./CleaningUpLocalData";

interface Props {
  children: React.ReactNode;
}

interface SessionData {
  name: string;
  value: string;
  type: "string" | "object";
}

export function ClearLocalData({ children }: Props) {
  const [database, setDatabase] = useState<DBInfo>();
  const [startCleaning, setStartCleaning] = useState(false);

  const getSession = (): SessionData[] => {
    const data: SessionData[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const name = localStorage.key(i)!;
      let value = localStorage.getItem(name)!;
      let type: "string" | "object" = "string";
      try {
        value = JSON.stringify(JSON.parse(value), null, 2);
        type = "object";
      } catch (error) {}
      data.push({
        name,
        value,
        type,
      });
    }
    return data;
  };

  const sessionData = getSession();

  useEffect(() => {
    db.getDBInfo().then((db) => setDatabase(db));
  }, []);

  useEffect(() => {
    if (!startCleaning) {
      db.getDBInfo().then((db) => setDatabase(db));
    }
  }, [startCleaning]);

  return (
    <React.Fragment>
      <Dialog id="manage-offline-translations">
        <DialogTrigger asChild>
          <div>{children}</div>
        </DialogTrigger>
        <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
          <DialogHeader className="p-6 pb-3">
            <DialogTitle>Limpar Dados Local</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="px-4 sm:px-6 pb-6 overflow-y-auto">
            <h2 className="text-xl">Sessão</h2>
            {sessionData.length === 0 && <div className="py-3">Nenhum dado na sessão.</div>}
            <Accordion type="multiple" className="w-full">
              {sessionData.map((data, i) => {
                return (
                  <AccordionItem value={data.name} key={i}>
                    <AccordionTrigger className="w-full text-left">{data.name}</AccordionTrigger>
                    <AccordionContent>
                      <pre className="overflow-x-auto bg-primary/10 p-2 rounded-md">{data.value}</pre>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
            <h2 className="text-xl py-4">Banco de Dados</h2>
            {!database ? (
              <div>Calculando...</div>
            ) : (
              <div className="grid grid-cols-3 [&>*]:border [&>*]:p-2">
                <div>Tabela</div>
                <div>Registros</div>
                <div>Tamanho</div>
                {database.tables.map((table, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div>{table.storeName}</div>
                      <div>{table.count}</div>
                      <div>{table.estimatedSizeFormatted}</div>
                    </React.Fragment>
                  );
                })}
                <div className="col-span-2">Total</div>
                <div>{database.estimatedTotalSizeFormatted}</div>
              </div>
            )}
          </div>
          <DialogFooter className="p-6 pt-3">
            <DialogConfirm
              message="Tem certeza que deseja limpar todos os dados locais?"
              btnAction="destructive"
              onConfirm={() => setStartCleaning(true)}
            >
              <Button variant={"destructive"}>Limpar Dados Local</Button>
            </DialogConfirm>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CleaningUpLocalData open={startCleaning} onOpenChange={setStartCleaning} />
    </React.Fragment>
  );
}
