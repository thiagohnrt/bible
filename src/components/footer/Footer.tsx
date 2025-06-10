import { getVersion } from "@/lib/utils";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { userAgent } from "next/server";
import imgLogo from "../../../public/biblehonor_logo.png";
import { SendFeedback } from "../more/SendFeedback";
import { Container } from "../root/Container";
import { ThemeToggle } from "../theme/ThemeToggle";
import BottomNavigator from "./BottomNavigator";

export function Footer() {
  const { device } = userAgent({ headers: headers() });
  if (device.type === "mobile") {
    return <BottomNavigator />;
  } else {
    return (
      <footer className="pb-6 pt-12 bg-neutral-100 dark:bg-neutral-900">
        <Container>
          <div className="flex justify-between pb-6">
            <div className="pr-10">
              <Link href="/">
                <Image src={imgLogo} width={60} height={60} alt="BibleHonor Logo" />
              </Link>
            </div>
            <div className="flex flex-col space-y-2 pr-10">
              <h3 className="uppercase text-sm font-bold">Recursos</h3>
              <Link href="/bible">Livros</Link>
              <Link href="/languages">Idiomas</Link>
              <Link href="/videos">Vídeos</Link>
              <Link href="/reading-plans">Planos de leitura</Link>
            </div>
            <div className="flex flex-col space-y-2 pr-10">
              <h3 className="uppercase text-sm font-bold">Nós</h3>
              <SendFeedback id="contact" type="contact" title="Contato">
                <a href="#contact">Contato</a>
              </SendFeedback>
              <Link href="/about">Sobre</Link>
            </div>
            <div className="flex flex-col space-y-2 pr-10">
              <h3 className="uppercase text-sm font-bold">Projeto</h3>
              <Link href="https://github.com/thiagohnrt/bible">Repositório</Link>
              <SendFeedback id="feedback" type="feedback" title="Sugestões e ideias">
                <a href="#feedback">Sugestões e ideias</a>
              </SendFeedback>
              <SendFeedback id="report-a-problem" type="problem" title="Reportar um problema">
                <a href="#report-a-problem">Reportar um problema</a>
              </SendFeedback>
            </div>
            <div className="flex flex-col space-y-2 pr-10">
              <h3 className="uppercase text-sm font-bold">Legal</h3>
              <Link href="/terms">Termos e Privacidade</Link>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-sm opacity-80">
              © Copyright {new Date().getFullYear()} BibleHonor. Versão {getVersion()}
            </div>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </footer>
    );
  }
}
