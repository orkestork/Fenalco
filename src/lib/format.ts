const fmt = new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const short = new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "short", timeZone: "UTC" });

export const formatDate = (iso: string) => fmt.format(new Date(iso));
export const dayMonth = (iso: string) => {
  const parts = short.formatToParts(new Date(iso));
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = (parts.find((p) => p.type === "month")?.value ?? "").replace(".", "");
  return { day, month };
};

export const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
