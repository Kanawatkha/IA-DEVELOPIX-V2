export async function exportQuoteImage(canvas: HTMLCanvasElement): Promise<Blob> {
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Unable to export quote image");
  return blob;
}

export function downloadQuoteImage(blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `ia-developix-quote-${Date.now()}.png`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
