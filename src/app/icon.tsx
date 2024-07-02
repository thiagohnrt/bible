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
    <PiLeafFill size={36} />,
    // <div
    //   style={{
    //     fontSize: 24,
    //     background: "black",
    //     width: "100%",
    //     height: "100%",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     color: "white",
    //     borderRadius: "5px",
    //   }}
    // >
    //   B
    // </div>
    size
  );
}
