import { ItemMenu } from "./ItemMenu";
import packageJson from "../../../package.json";

export function ItemVersion() {
  const getVersion = () => {
    const now = new Date();
    const year = String(now.getFullYear()).substring(2);
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Janeiro é 0!
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${packageJson.version}-${year}${month}${day}.${hours}${minutes}`;
  };

  return (
    <ItemMenu label={`Versão`}>
      <small className="opacity-50">{getVersion()}</small>
    </ItemMenu>
  );
}
