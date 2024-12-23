"use client";

import { forwardRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  message: string | React.ReactNode;
  children: React.ReactNode;
  btnAction?: "default" | "destructive";
  onConfirm: () => void;
  onCancel?: () => void;
}

export const DialogConfirm = forwardRef<HTMLDivElement, Props>(
  ({ message, children, btnAction = "default", onCancel, onConfirm }: Props, ref) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmação</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel}>Cancelar</AlertDialogCancel>
            <AlertDialogAction variant={btnAction} onClick={onConfirm}>
              Sim
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);
DialogConfirm.displayName = "DialogConfirm";
