import { Container } from "@/components/root/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cookies } from "next/headers";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const token = cookies().get("user-auth")?.value;

  async function login(data: FormData) {
    "use server";

    const getValue = (data: FormData, key: string) => {
      const value = data.get(key);
      if (!value) {
        return null;
      }
      return typeof value === "string" ? value : JSON.stringify(value);
    };

    const username = getValue(data, "username");
    const password = getValue(data, "password");
    const response = await fetch(`${process.env.APP_URL}/api/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30); // Expire in 30 dias
      cookies().set("user-auth", data.token, {
        httpOnly: true,
        expires: expiryDate,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });
    }
  }

  if (!token) {
    return (
      <Container>
        <form action={login} className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold border-b">Login</h1>
          <Input type="text" placeholder="Usuário" name="username" required />
          <Input type="password" placeholder="Senha" name="password" required />
          <Button type="submit" className="w-full">
            Entrar.
          </Button>
        </form>
      </Container>
    );
  } else {
    return children;
  }
}
