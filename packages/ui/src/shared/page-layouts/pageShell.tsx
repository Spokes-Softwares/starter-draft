/* Keeps the page spacing equal throughout the page; This can change or be removed if we find a more suitable method */

export default function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-10">{children}</div>;
}
