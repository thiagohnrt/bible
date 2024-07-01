"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <p>
        Houve um problema no carregamento dos dados, lamentamos essa situação.
        Verifique sua conexão e tente novamente em alguns instantes.
      </p>
      <button type="button" onClick={reset}>
        Recarregar
      </button>
    </div>
  );
}
