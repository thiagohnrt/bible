import { cn } from "@/lib/shad";
import { Button } from "../ui/button";
import { SendFeedback } from "../more/SendFeedback";

interface Props {
  className?: string;
}

export function BetaMessage({ className }: Props) {
  return (
    <div className={cn("md:flex block rounded-md p-4 bg-highlight", className)}>
      <div>
        <h2 className="text-lg font-medium">Estamos Construindo Algo Incrível!</h2>
        <p className="py-4">
          Esta é uma versão Beta, então você pode encontrar alguns problemas ou limitações. Estamos trabalhando para
          tornar o app ainda melhor!
        </p>
      </div>
      <div className="rounded-md p-4 bg-highlight">
        <h2 className="pb-4">Encontrou um problema ou tem alguma sugestão?</h2>
        <SendFeedback id="problem-or-feedback" type="feedback" title="Problema ou Sugestão">
          <Button type="button" className="block w-full">
            Envie-nos uma mensagem
          </Button>
        </SendFeedback>
      </div>
    </div>
  );
}
