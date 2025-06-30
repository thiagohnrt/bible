import { Container } from "@/components/root/Container";
import Link from "next/link";
import { MdChatBubble } from "react-icons/md";
import { RiBookFill } from "react-icons/ri";

export default async function AdminPage() {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-6">
        <ItemMenu title="Feedbacks" icon={<MdChatBubble size={40} />} url="/admin/feedbacks" />
        <ItemMenu title="Versículo do Dia" icon={<RiBookFill size={40} />} url="/admin/verseOfTheDay" />
      </div>
    </Container>
  );
}

function ItemMenu({ title, icon, url }: { title: string; icon: React.ReactNode; url: string }) {
  return (
    <Link
      href={url}
      className="border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors active:bg-neutral-200 dark:active:bg-neutral-800"
      style={{ aspectRatio: "1 / 1" }}
    >
      {icon}
      <h2 className="text-base">{title}</h2>
    </Link>
  );
}
