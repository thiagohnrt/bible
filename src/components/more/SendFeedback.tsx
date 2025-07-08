"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ToastAction } from "../ui/toast";

interface Props {
  id: string;
  title: string;
  type: "feedback" | "problem" | "contact";
  children: React.ReactNode;
}

export function SendFeedback({ id, title, type, children }: Props) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);

    const form = e.target.form as HTMLFormElement;
    const requiredFields = Array.from(form.elements).filter(
      (el) => (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) && el.required
    ) as (HTMLInputElement | HTMLTextAreaElement)[];

    const allRequiredFilled = requiredFields.every((field) => field.value !== "");

    setIsButtonDisabled(!allRequiredFilled);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save();
  };

  const save = () => {
    setIsSendingForm(true);
    fetch("/api/feedback", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, typeMsg: type }),
    })
      .then((response) => {
        if (response.ok) {
          router.back();
          toast({
            title: "Obrigado",
            description: `${formData.name}, nosso time vai analisar sua mensagem com carinho. Valorizamos muito a sua contribuição. Obrigado ;)`,
            duration: 10000,
            action: <ToastAction altText="Close">Fechar</ToastAction>,
          });
          setFormData({ name: "", email: "", message: "" });
        } else {
          showError();
        }
      })
      .catch(showError)
      .finally(() => setIsSendingForm(false));
  };

  const showError = () => {
    toast({
      variant: "destructive",
      title: "Ops! Algo deu errado.",
      description: `Ocorreu um problema com a sua solicitação.`,
      duration: 60000,
      action: (
        <ToastAction altText="Try again" onClick={save}>
          Tentar novamente
        </ToastAction>
      ),
    });
  };

  return (
    <Dialog id={id}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-6 pb-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-1">
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Nome"
              required={true}
              maxLength={60}
              disabled={isSendingForm}
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-mail (opcional)"
              required={false}
              maxLength={60}
              disabled={isSendingForm}
            />
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              placeholder="Escreva sua mensagem"
              required={true}
              maxLength={200}
              disabled={isSendingForm}
            />
            <Button disabled={isButtonDisabled || isSendingForm} className="flex">
              <span className="flex flex-1 justify-end">
                {isSendingForm ? <CgSpinner className="animate-spin" /> : <></>}
              </span>
              <span className="flex-none">Enviar</span>
              <span className="flex-1"></span>
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
