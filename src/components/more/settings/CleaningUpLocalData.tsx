import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { db } from "@/database/bibleDB";
import { useEffect, useState } from "react";

export function CleaningUpLocalData({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (open) {
      let initialProgress = 0;
      const incrementProgress = (step: number) => {
        initialProgress += step;
        setProgress(initialProgress);
      };

      const translationsOffline = db.getTranslationsOffline();
      const totalOffline = Object.keys(translationsOffline).length;
      const step = 100 / (totalOffline + 2); // +1 for languages and +1 for localStorage, cookies

      // Step 1: Delete all IndexedDB data
      const promises = Object.keys(translationsOffline).map((translation) => {
        return db.deleteTranslation(translation).then(() => {
          incrementProgress(step);
        });
      });

      // Step 2: Delete languages
      promises.push(
        db.deleteLanguages().then(() => {
          incrementProgress(step);
        })
      );

      // Wait for all deletions to complete
      Promise.all(promises).then(() => {
        // Step 3: Delete all local storage data
        localStorage.clear();

        // Step 4: Delete all cookies
        document.cookie.split(";").forEach((c) => {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });

        incrementProgress(step);
      });
    } else {
      setProgress(0);
    }
  }, [onOpenChange, open]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        window.location.href = "/";
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [progress, onOpenChange]);

  return (
    <Dialog id="cleaning-up-local-data" open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle className="[&>.btn-close]:hidden"></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex-1 flex flex-col justify-center items-center gap-4 p-6 pt-0 overflow-y-auto">
          {progress >= 100 ? (
            <div>
              <p className="text-lg font-bold">Limpeza concluída!</p>
              <p>Agora vamos preparar algumas coisas...</p>
            </div>
          ) : (
            <div className="text-lg font-bold">Limpando dados locais...</div>
          )}
          <Progress value={progress} className="w-full h-3" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
