"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

interface Props {
  device?: {
    model?: string;
    type?: string;
    vendor?: string;
  };
  className?: string;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function IntallApp({ className, device }: Props) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {}, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("Usuário aceitou a instalação.");
        } else {
          console.log("Usuário recusou a instalação.");
        }
        setDeferredPrompt(null);
      });
    }
  };

  if (device?.type !== "mobile") {
    return <></>;
  }

  return (
    <div className={cn("install-app block -mx-6 px-10 py-4 bg-highlight", className)}>
      <p className="text-lg font-bold">Melhore a experiência com o app!</p>
      <p className="py-4">Experimente um carregamento mais rápido durante a leitura do texto sagrado.</p>
      <Button type="button" className="block w-full" onClick={handleInstallClick}>
        Instalar App da Bíblia
      </Button>
    </div>
  );
}
