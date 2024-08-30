"use client";

import { KEY_COOKIE_CONSENT } from "@/constants/bible";
import { useEffect } from "react";
import { toast } from "sonner";

export function CookieConsent() {
  useEffect(() => {
    if (!localStorage.getItem(KEY_COOKIE_CONSENT)) {
      toast("Nós utilizamos armazenamento local para garantir a melhor experiência de uso.", {
        duration: Infinity,
        action: {
          label: "Concordo",
          onClick: () => {
            localStorage.setItem(KEY_COOKIE_CONSENT, new Date().toLocaleString());
          },
        },
      });
    }
  }, []);

  return <></>;
}
