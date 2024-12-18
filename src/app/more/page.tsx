import { ItemFeedback } from "@/components/more/ItemFeedback";
import { ItemMenu } from "@/components/more/ItemMenu";
import { ItemSettings } from "@/components/more/ItemSettings";
import { ItemShare } from "@/components/more/ItemShare";
import { ItemTranslation } from "@/components/more/ItemTranslation";
import { ItemVersion } from "@/components/more/ItemVersion";
import { Container } from "@/components/root/Container";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { MdChatBubbleOutline, MdInfoOutline, MdOutlineWarningAmber } from "react-icons/md";
import { RiBookLine } from "react-icons/ri";

export default function MorePage() {
  const iconSize = 20;

  return (
    <Container className="flex flex-col px-0">
      <ItemTranslation iconSize={iconSize} />
      <ItemMenu label="Planos de leitura" icon={<RiBookLine size={iconSize} />} />
      <Separator />
      <ItemMenu label="Aparência" icon={<ThemeToggle />} />
      <Separator />
      <ItemFeedback id="feedback" type="feedback" title="Sugestões e ideias">
        <ItemMenu label="Feedback" icon={<MdChatBubbleOutline size={iconSize} />}>
          <small className="opacity-50">Sugestões e ideias</small>
        </ItemMenu>
      </ItemFeedback>
      <ItemFeedback id="report-a-problem" type="problem" title="Reportar um problema">
        <ItemMenu label="Reportar um problema" icon={<MdOutlineWarningAmber size={iconSize} />} />
      </ItemFeedback>
      <Separator />
      <ItemSettings iconSize={iconSize} />
      <ItemShare iconSize={iconSize} />
      <ItemMenu label="Sobre" icon={<MdInfoOutline size={iconSize} />} />
      <ItemVersion />
    </Container>
  );
}

function Separator() {
  return <div className="border-t my-3"></div>;
}
