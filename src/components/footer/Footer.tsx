import { headers } from "next/headers";
import { userAgent } from "next/server";
import BottomNavigator from "./BottomNavigator";
import { Container } from "../root/Container";
import { ThemeToggle } from "../theme/ThemeToggle";

export function Footer() {
  const { device } = userAgent({ headers: headers() });
  if (device.type === "mobile") {
    return <BottomNavigator />;
  } else {
    return (
      <footer className="py-6">
        <Container>
          <div className="flex justify-between">
            <div className="text-sm opacity-80">© Copyright {new Date().getFullYear()} BibleHonor.</div>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </footer>
    );
  }
}
