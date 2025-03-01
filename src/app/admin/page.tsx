"use server";

import { Container } from "@/components/root/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cookies } from "next/headers";
import Link from "next/link";
import { MdChatBubble } from "react-icons/md";
import { RiBookFill } from "react-icons/ri";

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  async function login(data: FormData) {
    "use server";
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();
    const response = await fetch(`${process.env.APP_URL}/api/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      cookieStore.set("token", data.token);
    }
  }

  if (!token) {
    return (
      <Container>
        <form action={login} className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold border-b">Login</h1>
          <Input type="username" placeholder="Usuário" name="password" required />
          <Input type="password" placeholder="Senha" name="password" required />
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </Container>
    );
  } else {
    return (
      <Container>
        <div className="grid grid-cols-2 gap-6">
          <ItemMenu title="Feedbacks" icon={<MdChatBubble size={40} />} url="/admin/feedbacks" />
          <ItemMenu title="Versículo do Dia" icon={<RiBookFill size={40} />} url="/admin/verseOfTheDay" />
        </div>
      </Container>
    );
  }
}

function ItemMenu({ title, icon, url }: { title: string; icon: React.ReactNode; url: string }) {
  return (
    <Link
      href={url}
      className="border rounded-lg flex flex-col items-center justify-center gap-2 transition-colors active:bg-neutral-200 dark:active:bg-neutral-800"
      style={{ aspectRatio: "1 / 1" }}
    >
      {icon}
      <h2 className="text-base">{title}</h2>
    </Link>
  );
}
