import { BOOKS, TRANSLATION_DEFAULT } from "@/constants/bible";
import { useToast } from "@/hooks/use-toast";
import { bibleUtils } from "@/lib/bibleUtils";
import { cn } from "@/lib/shad";
import { repeat } from "@/lib/utils";
import { IVerseOfTheDay } from "@/models/verseOfTheDayModel";
import { BibleContext } from "@/providers/bibleProvider";
import { api, Verse as IVerse } from "@/services/api";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useContext, useState } from "react";
import Verse from "../../chapter/Verse";
import { DialogConfirm } from "../../root/DialogConfirm";
import { Button } from "../../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Input } from "../../ui/input";

interface NewVerseOfTheDayProps {
  children: React.ReactNode;
  data?: IVerseOfTheDay;
  onSaved: () => void;
}

const initialFormaData = {
  id: "",
  book: "",
  chapter: "",
  verses: "",
  date: "",
  repeat: "",
};

export function DialogFormVerseOfTheDay({ children, data, onSaved }: NewVerseOfTheDayProps) {
  const { getBook } = useContext(BibleContext);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [isSendingForm, setIsSendingForm] = useState(false);
  const [isDeletingForm, setIsDeletingForm] = useState(false);
  const [formData, setFormData] = useState(initialFormaData);
  const [previewData, setPreviewData] = useState({
    address: "",
    verses: [] as IVerse[],
  });
  const { toast } = useToast();
  const router = useRouter();

  const onOpen = () => {
    if (data && !formData.book) {
      setFormData({
        id: data?._id?.toString() ?? "",
        book: data?.book.toString() ?? "",
        chapter: data?.chapter.toString() ?? "",
        verses: data?.verses.join(",") ?? "",
        date: data?.date?.split("T")[0] ?? "",
        repeat: data?.repeat ? "S" : "",
      });
      setPreviewData({
        address: "",
        verses: [],
      });
    }
  };

  const onClose = () => {
    setFormData(initialFormaData);
    setPreviewData({
      address: "",
      verses: [],
    });
  };

  const preview = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      if (!formData) return;
      setIsLoadingPreview(true);
      const { book: bookId, chapter, verses } = formData;
      getBook(TRANSLATION_DEFAULT, +bookId).then((book) => {
        const address = bibleUtils.formatVerseAddress(
          book,
          +chapter,
          verses.split(",").map((verse) => ({ verse: +verse } as IVerse))
        );
        Promise.all(
          verses.split(",").map((verse) => api.getVerse(TRANSLATION_DEFAULT, book.book, +chapter, +verse))
        ).then((data) => {
          setPreviewData({
            address,
            verses: data,
          });
          setIsLoadingPreview(false);
        });
      });
    },
    [formData, getBook]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as keyof IVerseOfTheDay]: value });
  };

  const onSave = async () => {
    setIsSendingForm(true);
    const data: IVerseOfTheDay = {
      _id: formData.id,
      book: +formData.book,
      chapter: +formData.chapter,
      verses: formData.verses.split(",").map((verse) => +verse),
      date: formData.date,
      repeat: formData.repeat === "S",
    };
    const response = await fetch("/api/admin/verseOfTheDay", {
      method: formData.id ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast({
        title: "Salvo com sucesso",
        description: "Versículo do dia salvo com sucesso",
      });
      router.back();
      onSaved();
    } else {
      toast({
        title: "Erro ao salvar",
        description: "Erro ao salvar o versículo do dia",
        variant: "destructive",
      });
    }
    setIsSendingForm(false);
  };

  const onDelete = async () => {
    setIsDeletingForm(true);
    const response = await fetch("/api/admin/verseOfTheDay", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: formData.id }),
    });
    if (response.ok) {
      toast({
        title: "Excluído com sucesso",
        description: "Versículo do dia excluído com sucesso",
      });
      router.back();
      onSaved();
    } else {
      toast({
        title: "Erro ao excluir",
        description: "Erro ao excluir o versículo do dia",
        variant: "destructive",
      });
    }
    setIsDeletingForm(true);
  };

  return (
    <Dialog id="new-verse-of-the-day" onOpen={onOpen} onClose={onClose}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="flex flex-col h-svh w-lvw p-0 md:max-w-lg md:h-auto md:max-h-[90vh] md:border md:rounded-lg">
        <DialogHeader className="p-6 pb-3">
          <DialogTitle>{formData.id ? "Alterar" : "Novo"} Versículo do Dia</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto px-4 pb-6">
          <form id="form-verse-of-the-day" className="grid grid-cols-2 gap-4" onSubmit={preview}>
            <div className="col-span-2">
              <label htmlFor="book">Livro</label>
              <select
                id="book"
                name="book"
                value={formData?.book}
                onChange={handleInputChange}
                required={true}
                className="h-9 w-full rounded-md border border-input px-3 py-2 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="" className="hidden">
                  Selecione um livro
                </option>
                {repeat(66, (book) => {
                  return (
                    <option key={book} value={book + 1}>
                      {BOOKS[book]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label htmlFor="chapter">Capítulo</label>
              <Input
                type="text"
                id="chapter"
                name="chapter"
                value={formData.chapter}
                onChange={handleInputChange}
                required={false}
                placeholder="Capítulo"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="verses">Versículo(s)</label>
              <Input
                type="text"
                id="verses"
                name="verses"
                value={formData.verses}
                onChange={handleInputChange}
                required={true}
                placeholder="Versículo"
                className="w-full"
              />
            </div>
            <div className="col-span-2">
              <fieldset className="border p-3">
                <legend>Repetição</legend>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date">Data</label>
                    <Input
                      id="date"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required={false}
                      placeholder="Data especial"
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="repeat"
                      name="repeat"
                      checked={formData.repeat === "S"}
                      onChange={(e) =>
                        handleInputChange({
                          ...e,
                          target: { ...e.target, name: e.target.name, value: e.target.checked ? "S" : "" },
                        })
                      }
                      required={false}
                    />
                    <label htmlFor="repeat">Repetir todo ano</label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="flex gap-4 col-span-2">
              <Button disabled={isLoadingPreview || isSendingForm || isDeletingForm} className="flex-1">
                Visualizar
              </Button>
              <DialogConfirm
                message="Confirma a exclusão do Versículo do Dia?"
                btnAction="destructive"
                onConfirm={onDelete}
              >
                <Button
                  type="button"
                  disabled={isDeletingForm || isSendingForm}
                  className={cn("flex-1 hidden", formData.id && "block")}
                  variant="destructive"
                >
                  Excluir
                </Button>
              </DialogConfirm>
            </div>
            {previewData.address ? (
              <div className="col-span-2 border p-3">
                <h2 className="pb-2">{previewData.address}</h2>
                <div className="pb-3">
                  {previewData.verses.map((verse) => (
                    <Verse key={verse.verse} number={verse.verse} text={verse.text} />
                  ))}
                </div>
                <Button onClick={onSave} disabled={isSendingForm || isDeletingForm} className="w-full">
                  Salvar
                </Button>
              </div>
            ) : (
              <></>
            )}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
