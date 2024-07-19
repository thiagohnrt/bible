import { ImageResponse } from "next/og";
import { PiLeafFill } from "react-icons/pi";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";
export const runtime = "edge";

export default function icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 28,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
        }}
      >
        <PiLeafFill />
      </div>
    ),
    size
  );
}
