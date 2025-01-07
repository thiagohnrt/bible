"use client";

import { cn } from "@/lib/shad";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

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

interface NavigatorExtended extends Navigator {
  standalone?: boolean;
}

export function IntallApp({ className, device }: Props) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isInStandaloneMode, setIsInStandaloneMode] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    const navigatorExtended = window.navigator as NavigatorExtended;
    const isStandalone = navigatorExtended.standalone || window.matchMedia("(display-mode: standalone)").matches;

    setIsIos(isIosDevice);
    setIsInStandaloneMode(isStandalone);
  }, []);

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
    } else if (isIos && !isInStandaloneMode) {
      alert(
        "Para instalar esse aplicativo, toque no ícone de compartilhamento e selecione 'Adicionar à Tela de Início'."
      );
    }
  };

  if (device?.type !== "mobile") {
    return <></>;
  }

  return (
    <div className={cn("install-app block -mx-6 px-10 py-4 bg-highlight", className)}>
      <p className="text-lg font-medium">Melhore a experiência com o app!</p>
      <p className="py-4">Experimente um carregamento mais rápido durante a leitura da Bíblia sagrada.</p>
      <Button type="button" className="block w-full" onClick={handleInstallClick}>
        Instalar App da Bíblia
      </Button>
    </div>
  );
}
