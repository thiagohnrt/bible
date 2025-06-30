import { getVersion } from "@/lib/utils";
import { ItemMenu } from "./ItemMenu";

export function ItemVersion() {
  return (
    <ItemMenu label={`Versão`}>
      <small className="opacity-50">{getVersion()}</small>
    </ItemMenu>
  );
}
