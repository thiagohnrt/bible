import { cn } from "@/lib/shad";
import React from "react";

/**
 * Util: converte ângulo (graus) para coordenadas cartesianas na circunferência.
 * A referência é "topo" (−90°), para o 0° começar em cima.
 */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

/**
 * Util: gera o path SVG de um arco entre startAngle e endAngle.
 */
function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

interface Props {
  steps?: number;
  size?: number;
  thickness?: number;
  /** Gap fixo em pixels ao longo da circunferência (não é fração). */
  gapPx?: number;
  /** qtd de segmentos concluídos */
  completed?: number;
  /** índice (0..steps-1) da etapa ativa. Se você usa 1-based, ajuste no map. */
  active?: number | null;
  colors?: {
    /** cor dos segmentos "pendentes" */
    base?: string;
    /** cor dos segmentos concluídos */
    completed?: string;
    /** cor do segmento ativo */
    active?: string;
  };
  lineCap?: "butt" | "inherit" | "round" | "square" | undefined;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Componente: indicador circular segmentado com gap fixo em px.
 */
export function CircularSteps({
  steps = 6,
  size = 140,
  thickness = 8,
  gapPx = 8, // <<— agora o gap é absoluto (px)
  completed = 0,
  active = null,
  colors = {
    base: "#333",
    completed: "#2563eb",
    active: "#f59e0b",
  },
  lineCap = "butt",
  className,
  style = {},
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - thickness / 2;

  // Geometria
  const circumference = 2 * Math.PI * r; // em px
  const sliceDeg = 360 / steps; // cada fatia em graus
  const gapDeg = (gapPx / circumference) * 360; // gap convertido para graus

  // Ângulo efetivo desenhado (traço visível). Evita negativo.
  const drawDeg = Math.max(0, sliceDeg - gapDeg);

  // Aviso se o gap for muito grande para as dimensões atuais
  if (process.env.NODE_ENV !== "production" && drawDeg <= 0) {
    // eslint-disable-next-line no-console
    console.warn(
      `CircularSteps: gapPx (${gapPx}px) grande demais para steps=${steps} e size=${size} (r=${r}px). ` +
        `Reduza gapPx ou aumente o size/thickness.`
    );
  }

  // Gera os caminhos dos segmentos
  const paths = Array.from({ length: steps }, (_, i) => {
    const start = i * sliceDeg + gapDeg / 2;
    const end = start + drawDeg;
    return {
      d: arcPath(cx, cy, r, start, end),
      index: i,
    };
  });

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: size, height: size, ...style }}
      aria-label={`Indicador circular com ${steps} etapas`}
      role="img"
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {paths.map(({ d, index }) => {
          // Decide cor por estado
          let stroke = colors?.base ?? "#333";

          // Se sua app usa ativo 1-based, mantenha (index + 1). Caso contrário, mude para (index === active).
          if (active === index + 1) stroke = colors?.active ?? "#f59e0b";
          if (index < completed) stroke = colors?.completed ?? "#2563eb";

          return <path key={index} d={d} fill="none" stroke={stroke} strokeWidth={thickness} strokeLinecap={lineCap} />;
        })}
      </svg>
    </div>
  );
}
