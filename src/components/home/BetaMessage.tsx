import { cn } from "@/lib/shad";
import { Button } from "../ui/button";
import { SendFeedback } from "../more/SendFeedback";

interface Props {
  className?: string;
  device?: {
    model?: string;
    type?: string;
    vendor?: string;
  };
}

export function BetaMessage({ className, device }: Props) {
  if (device?.type !== "mobile") {
    return <></>;
  }
  return (
    <div className={cn("rounded-md p-4 bg-highlight", className)}>
      <h2 className="pb-4">Encontrou um problema ou tem alguma sugestão?</h2>
      <SendFeedback id="problem-or-feedback" type="feedback" title="Problema ou Sugestão">
        <Button type="button" className="block w-full">
          Envie-nos uma mensagem
        </Button>
      </SendFeedback>
    </div>
  );
}
