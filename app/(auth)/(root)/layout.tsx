import Nav from "@/app/componets/nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav /> 
        {children}
    </>
  );
}
