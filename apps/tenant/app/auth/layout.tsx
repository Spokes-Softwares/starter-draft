import AuthBody from "./_components/auth-body";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthBody>{children}</AuthBody>;
}
