import Image from "next/image";
import { MdShare } from "react-icons/md";
import img01 from "../../../public/img/verseOfTheDay/1.jpg";
import img02 from "../../../public/img/verseOfTheDay/2.jpg";
import img03 from "../../../public/img/verseOfTheDay/3.jpg";
import img04 from "../../../public/img/verseOfTheDay/4.jpg";
import img05 from "../../../public/img/verseOfTheDay/5.jpg";
import img06 from "../../../public/img/verseOfTheDay/6.jpg";
import img07 from "../../../public/img/verseOfTheDay/7.jpg";
import img08 from "../../../public/img/verseOfTheDay/8.jpg";
import img09 from "../../../public/img/verseOfTheDay/9.jpg";
import img10 from "../../../public/img/verseOfTheDay/10.jpg";
import img11 from "../../../public/img/verseOfTheDay/11.jpg";
import img12 from "../../../public/img/verseOfTheDay/12.jpg";
import img13 from "../../../public/img/verseOfTheDay/13.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { VerseOfTheDayText } from "./VerseOfTheDayText";

interface Props {
  className?: string;
}

export function VerseOfTheDay({ className }: Props) {
  const images = [img01, img02, img03, img04, img05, img06, img07, img08, img09, img10, img11, img12, img13];

  const randomImage = () => {
    const currentDate = new Date();
    const dayOfYear =
      (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
        Date.UTC(currentDate.getFullYear(), 0, 0)) /
      86400000;
    return images[dayOfYear % images.length] ?? img01;
  };

  const imgSrc = randomImage();

  return (
    <div className={className}>
      <h1 className="text-lg font-bold mb-2">Versículo do dia</h1>
      <Dialog id="verseOfTheDay">
        <DialogTrigger className="w-full">
          <div className="flex items-center text-left p-8 relative min-h-60">
            <Image
              src={imgSrc}
              alt="Versículo do dia"
              placeholder="blur"
              fill={true}
              style={{ objectFit: "cover", zIndex: 1 }}
              className="rounded-lg"
            />
            <VerseOfTheDayText />
          </div>
        </DialogTrigger>
        <DialogContent className="h-svh w-lvw p-0">
          <DialogHeader className="hidden">
            <DialogTitle></DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex items-center p-8 relative">
            <Image
              src={imgSrc}
              alt="Versículo do dia"
              placeholder="blur"
              fill={true}
              style={{ objectFit: "cover", zIndex: 1 }}
            />
            <VerseOfTheDayText className="[&>.votd-verse]:text-2xl [&>.votd-verse]:leading-10 [&>.votd-book]:text-base" />
          </div>
          <DialogFooter
            className="absolute left-0 right-0 bottom-0 flex flex-row justify-center gap-8 p-6 text-white"
            style={{ zIndex: 3 }}
          >
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full active:shadow-xl transition-shadow"
              style={{ zIndex: 5 }}
            >
              <MdShare size={24} />
            </div>
            <div
              className="absolute -left-10 -right-10 -bottom-10 h-10"
              style={{
                zIndex: 4,
                boxShadow: "0 0px 100px 10px rgba(0, 0, 0, 1)",
              }}
            ></div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
