"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/shad";
import { forwardRef } from "react";
import { RiSettings3Line } from "react-icons/ri";
import { ItemMenu } from "./ItemMenu";
import { ClearLocalData } from "./settings/ClearLocalData";
import { ManageOfflineTranslations } from "./settings/ManageOfflineTranslations";

interface Props {
  iconSize: number;
}

export function ItemSettings({ iconSize }: Props) {
  return (
    <Dialog id="settings">
      <DialogTrigger asChild>
        <ItemMenu label="Configurações" icon={<RiSettings3Line size={iconSize} />} />
      </DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <ManageOfflineTranslations>
            <Item label="Gerenciar Versões Offline" />
          </ManageOfflineTranslations>
          <ClearLocalData>
            <Item label="Limpar Dados Local" className="text-red-600" />
          </ClearLocalData>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ItemProps {
  label: string;
  className?: string;
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(({ label, className, ...props }, ref) => {
  return (
    <div className={cn("px-4 py-4 active:bg-neutral-100 dark:active:bg-neutral-900 transition-colors", className)}>
      {label}
    </div>
  );
});

Item.displayName = "Item";
