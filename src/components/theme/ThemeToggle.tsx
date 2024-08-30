import { RiDeviceLine, RiMoonLine, RiSunLine } from "react-icons/ri";
import { ThemeIcon } from "./ThemeIcon";

export function ThemeToggle() {
  return (
    <div className="flex border rounded-full">
      <ThemeIcon theme="system">
        <RiDeviceLine size={20} />
      </ThemeIcon>
      <ThemeIcon theme="light">
        <RiSunLine size={20} />
      </ThemeIcon>
      <ThemeIcon theme="dark">
        <RiMoonLine size={20} />
      </ThemeIcon>
    </div>
  );
}
