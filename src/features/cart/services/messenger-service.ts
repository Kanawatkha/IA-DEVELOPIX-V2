const FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=61585300577028";

export function getMessengerUrl(): string {
  return FACEBOOK_PAGE_URL;
}

export async function shareQuoteToMessenger(blob: Blob): Promise<boolean> {
  if (typeof navigator === "undefined" || !("share" in navigator)) return false;

  const file = new File([blob], "ia-developix-quote.png", { type: "image/png" });
  if ("canShare" in navigator && !navigator.canShare({ files: [file] })) return false;

  try {
    await navigator.share({ files: [file], title: "IA DEVELOPIX quote" });
    return true;
  } catch {
    return false;
  }
}
