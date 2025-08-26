import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/database/bibleDB";
import { DBInfo } from "@/database/indexedDB";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    db.getDBInfo().then((db) => setDatabase(db));
  }, []);

  return (
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
          <h2 className="text-lg">Sessão</h2>
          <Accordion type="multiple" className="w-full">
            {getSession().map((data, i) => {
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
          <div className="py-4"></div>
          <h2 className="text-lg">Banco de Dados</h2>
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
      </DialogContent>
    </Dialog>
  );
}
