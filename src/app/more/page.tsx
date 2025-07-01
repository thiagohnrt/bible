import { ItemMenu } from "@/components/more/ItemMenu";
import { ItemSettings } from "@/components/more/ItemSettings";
import { ItemShare } from "@/components/more/ItemShare";
import { ItemTranslation } from "@/components/more/ItemTranslation";
import { ItemVersion } from "@/components/more/ItemVersion";
import { SendFeedback } from "@/components/more/SendFeedback";
import { Container } from "@/components/root/Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import Link from "next/link";
import { GoVideo } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdChatBubbleOutline, MdHistory, MdInfoOutline, MdOutlineWarningAmber } from "react-icons/md";
import { RiBookLine, RiGithubFill } from "react-icons/ri";

export default function MorePage() {
  const iconSize = 20;

  return (
    <Container className="flex flex-col px-0">
      <ItemTranslation iconSize={iconSize} />
      <ItemMenu label="Planos de leitura" icon={<RiBookLine size={iconSize} />}>
        <small className="opacity-50">(Em breve)</small>
      </ItemMenu>
      <ItemMenu label="Vídeos" icon={<GoVideo size={iconSize} />}>
        <small className="opacity-50">(Em breve)</small>
      </ItemMenu>
      <Link href="/history">
        <ItemMenu label="Histórico de leitura" icon={<MdHistory size={iconSize + 2} />} />
      </Link>
      <Separator />
      <ItemMenu label="Aparência" icon={<ThemeToggle />} />
      <Separator />
      <SendFeedback id="feedback" type="feedback" title="Sugestões e ideias">
        <ItemMenu label="Feedback" icon={<MdChatBubbleOutline size={iconSize} />}>
          <small className="opacity-50">Sugestões e ideias</small>
        </ItemMenu>
      </SendFeedback>
      <SendFeedback id="report-a-problem" type="problem" title="Reportar um problema">
        <ItemMenu label="Reportar um problema" icon={<MdOutlineWarningAmber size={iconSize} />} />
      </SendFeedback>
      <Link href="https://github.com/thiagohnrt/bible" target="_blank">
        <ItemMenu label="Repositório" icon={<RiGithubFill size={iconSize} />} />
      </Link>
      <Separator />
      <ItemSettings iconSize={iconSize} />
      <ItemShare iconSize={iconSize} />
      <Link href="/about">
        <ItemMenu label="Sobre" icon={<MdInfoOutline size={iconSize} />} />
      </Link>
      <Link href="/terms">
        <ItemMenu label="Termos e Privacidade" icon={<IoDocumentTextOutline size={iconSize} />} />
      </Link>
      <Link href="/admin">
        <ItemVersion />
      </Link>
    </Container>
  );
}

function Separator() {
  return <div className="border-t my-3"></div>;
}
