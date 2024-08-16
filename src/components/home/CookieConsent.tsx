"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function CookieConsent() {
  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      toast("Nós utilizamos armazenamento local para garantir a melhor experiência de uso.", {
        duration: Infinity,
        action: {
          label: "Concordo",
          onClick: () => {
            localStorage.setItem("cookie_consent", new Date().toLocaleString());
          },
        },
      });
    }
  }, []);

  return <></>;
}
