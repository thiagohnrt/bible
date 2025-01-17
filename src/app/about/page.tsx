import { Container } from "@/components/root/Container";
import { cn } from "@/lib/shad";

export default function AboutPage() {
  return (
    <Container
      className={cn(
        "[&>h1.title]:text-xl",
        "[&>h1]:text-2xl [&>h1]:pt-6 [&>h1]:pb-4",
        "[&>h2]:text-xl [&>h2]:py-4 [&>h1+h2]:pt-0",
        "[&>p]:pb-2",
        "[&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:pb-1",
        "pb-8"
      )}
    >
      <h2>Sobre o BibleHonor</h2>
      <h1>Ajudamos as pessoas a se conectarem com a Palavra de Deus</h1>
      <p>
        O BibleHonor é um app feito para quem quer ler e estudar a Bíblia de um jeito simples e prático. Nosso objetivo
        é facilitar o acesso às Escrituras e ajudar você a conhecer mais sobre Deus por meio da Sua Palavra.
      </p>
      <p>
        Criamos o BibleHonor para ser uma nova experiência de ler a Bíblia. Aqui você encontra diferentes idiomas e
        versões das escrituras, comparação entre traduções, notas de estudo com referência entre versículos e
        explicações contextuais, que ajudam no estudo da palavra. Tudo isso em um ambiente seguro, sem distrações e
        feito para focar no que realmente importa.
      </p>
      <p>
        E o melhor: somos 100% gratuitos, sem anúncios e sem compras.&nbsp;<strong>Esse é o nosso compromisso</strong>!
      </p>
      <h1>Nosso conteúdo</h1>
      <h2>Texto bíblico</h2>
      <p>
        No BibleHonor, você encontra textos bíblicos fornecidos por parceiros, que disponibilizam traduções oficiais da
        Bíblia em diferentes idiomas e versões para que você tenha acesso fácil e confiável às Escrituras.
      </p>
      <p>
        As traduções são de responsabilidade das organizações que cuidam delas, e nós apenas conectamos você à Palavra
        de Deus de forma prática e acessível.
      </p>
      <h2>Vídeo</h2>
      <p>
        Os vídeos no BibleHonor são fornecidos por parceiros que produzem conteúdos de qualidade para aprofundar o
        entendimento das Escrituras e enriquecer sua jornada espiritual. Você terá acesso a explicações de textos e
        histórias bíblicas, além de ilustrações que trazem à vida as passagens das Escrituras. Esses vídeos tornam o
        aprendizado mais envolvente e ajudam a compreender melhor o contexto e os ensinamentos da Bíblia.
      </p>
      <h2>Plano de leitura</h2>
      <p>
        Os planos de leitura também são disponibilizados por parceiros especializados, que criam guias para ajudar você
        a organizar e manter uma rotina de leitura da Bíblia. Seja para ler a Bíblia inteira, estudar temas específicos
        ou acompanhar um devocional, nossos planos de leitura são ferramentas práticas e acessíveis para sua jornada
        espiritual.
      </p>
      <h1>O que oferecemos</h1>
      <ul>
        <li>
          <strong>Leitura em diversos idiomas e versões</strong>: Aprofunde sua compreensão das Escrituras com acesso a
          diferentes idiomas e versões.
        </li>
        <li>
          <strong>Comparação entre versões</strong>: Compare facilmente diferentes versões da Bíblia e veja como cada
          uma aborda o mesmo versículo e descubra novos significados.
        </li>
        <li>
          <strong>Notas de estudo</strong>: Aprimore seu estudo com explicações contextuais e referência entre
          versículos, facilitando um entendimento mais profundo (verifique a disponibilidade em cada tradução).
        </li>
        <li>
          <strong>Continuar a leitura</strong>: Nunca perca o ritmo! Continue sua leitura de onde parou, sem
          complicações.
        </li>
        <li>
          <strong>Compartilhar versículo</strong>: Compartilhe facilmente versículos poderosos com seus amigos e
          familiares nas redes sociais ou por mensagem.
        </li>
        <li>
          <strong>Versículo do dia (em breve)</strong>: Receba uma mensagem inspiradora todos os dias, diretamente no
          seu dispositivo, para fortalecer sua caminhada com Deus.
        </li>
        <li>
          <strong>Vídeo (em breve)</strong>: Assista a conteúdos que tornam a Bíblia ainda mais clara e envolvente, com
          ilustrações que facilitam o entendimento do texto.
        </li>
        <li>
          <strong>Plano de leitura (em breve)</strong>: Disponibilizaremos planos de leitura para ajudá-lo a seguir uma
          jornada espiritual consistente e focada.
        </li>
      </ul>
    </Container>
  );
}
