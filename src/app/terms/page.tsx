import { Container } from "@/components/root/Container";
import { cn } from "@/lib/shad";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso e Política de Privacidade | BibleHonor",
  description: "Termos de Uso e Política de Privacidade do aplicativo BibleHonor.",
};

export default function TermsPage() {
  return (
    <Container
      className={cn(
        "[&>h1]:text-3xl [&>h1]:pt-6 [&>h1]:pb-4",
        "[&>section+section]:mt-6",
        "[&>section>h2]:text-2xl [&>section>h2]:py-4 [&>section>h1+h2]:pt-0",
        "[&>section>h3]:text-xl [&>section>h3]:py-4 [&>section>h2+h3]:pt-0",
        "[&>section>p]:pb-2",
        "[&>section>ul]:list-disc [&>section>ul]:pl-6 [&>section>ul>li]:pb-1",
        "pb-8"
      )}
    >
      <h1>Termos de Uso e Política de Privacidade</h1>
      <section>
        <h2>Termos de Uso</h2>
        <h3>1. Aceitação dos Termos</h3>
        <p>
          Ao usar o <strong>BibleHonor</strong>, você concorda com estes Termos de Uso. Se não concordar, recomendamos
          que não utilize o aplicativo.
        </p>

        <h3>2. Sobre o BibleHonor</h3>
        <p>
          O <strong>BibleHonor</strong> é um aplicativo gratuito que permite a leitura da Bíblia em diversas traduções e
          idiomas, além de oferecer recursos adicionais como comparação de versões, planos de leitura e vídeos
          ilustrativos.
        </p>

        <h3>3. Uso do Aplicativo</h3>
        <ul>
          <li>
            O <strong>BibleHonor</strong> deve ser utilizado exclusivamente para fins pessoais e não comerciais.
          </li>
          <li>Não é permitido copiar, modificar, distribuir ou vender qualquer parte do aplicativo sem autorização.</li>
          <li>O uso do aplicativo não concede qualquer direito sobre os conteúdos disponibilizados por terceiros.</li>
        </ul>

        <h3>4. Conteúdo de Terceiros</h3>
        <p>
          Os textos bíblicos, vídeos e planos de leitura exibidos no <strong>BibleHonor</strong> são fornecidos por
          parceiros e pertencem às organizações responsáveis por suas respectivas traduções e produções. O{" "}
          <strong>BibleHonor</strong> apenas facilita o acesso a esses conteúdos.
        </p>

        <h3>5. Limitação de Responsabilidade</h3>
        <ul>
          <li>
            O <strong>BibleHonor</strong> é fornecido &quot;como está&quot;, sem garantias de funcionamento ininterrupto
            ou livre de erros.
          </li>
          <li>
            Não nos responsabilizamos por falhas técnicas, indisponibilidades ou erros nos conteúdos fornecidos por
            terceiros.
          </li>
          <li>O usuário é responsável pelo uso que faz do aplicativo e pelos impactos desse uso.</li>
        </ul>

        <h3>6. Alterações nos Termos</h3>
        <p>
          Podemos atualizar estes Termos de Uso a qualquer momento. Notificaremos os usuários caso mudanças
          significativas sejam feitas.
        </p>

        {/* <h3>7. Contato</h3>
        <p>
          Se tiver dúvidas sobre os Termos de Uso, entre em contato conosco pelo email{" "}
          <strong>seuemail@exemplo.com</strong>.
        </p> */}
      </section>
      <section>
        <h2>Política de Privacidade</h2>

        <h3>1. Informações que Coletamos</h3>
        <p>
          O <strong>BibleHonor</strong> não coleta diretamente informações pessoais dos usuários. No entanto, utilizamos
          serviços de terceiros que podem coletar dados para melhorar a experiência do usuário.
        </p>

        <h3>2. Uso de Serviços de Terceiros</h3>
        <p>
          O <strong>BibleHonor</strong> integra APIs e serviços externos para exibir textos bíblicos, vídeos e planos de
          leitura. Esses serviços podem coletar dados como:
        </p>
        <ul>
          <li>Informações sobre o dispositivo e o navegador utilizado.</li>
          <li>Dados de uso do aplicativo (como páginas visitadas e interações).</li>
          <li>Cookies ou identificadores anônimos para melhorar o funcionamento do serviço.</li>
        </ul>

        <h3>3. Compartilhamento de Dados</h3>
        <p>
          O <strong>BibleHonor</strong> não vende ou compartilha informações dos usuários com terceiros, exceto nos
          casos em que seja necessário para o funcionamento do aplicativo.
        </p>

        <h3>4. Segurança</h3>
        <p>
          Adotamos medidas para garantir a segurança das informações transmitidas pelo aplicativo. No entanto, não
          podemos garantir proteção absoluta contra eventuais falhas ou ataques.
        </p>

        <h3>5. Direitos dos Usuários</h3>
        <p>
          Os usuários podem gerenciar as permissões do aplicativo diretamente em seus dispositivos, incluindo a
          desativação do uso de cookies e rastreadores de terceiros.
        </p>

        <h3>6. Alterações na Política de Privacidade</h3>
        <p>
          Esta Política pode ser atualizada periodicamente. Notificaremos os usuários caso mudanças relevantes ocorram.
        </p>

        {/* <h3>7. Contato</h3>
        <p>
          Se tiver dúvidas sobre esta Política de Privacidade, entre em contato pelo email{" "}
          <strong>seuemail@exemplo.com</strong>.
        </p> */}
      </section>
    </Container>
  );
}
