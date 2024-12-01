export const RenderWorld = ({
  canvas,
}: {
  canvas: React.RefObject<HTMLCanvasElement>;
}) => {
  if (!canvas) return;
  const ctx = canvas.current?.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.current!.width, canvas.current!.height);
};
