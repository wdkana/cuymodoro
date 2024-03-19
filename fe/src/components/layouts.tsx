function Layouts({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="mx-auto flex min-h-screen max-w-2xl">{children}</div>;
}

export default Layouts;
