import AuthBody from "../../components/app-layout/auth-body";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthBody>{children}</AuthBody>;
}
