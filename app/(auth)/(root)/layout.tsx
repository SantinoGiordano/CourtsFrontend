import Nav from "@/app/components/nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <p className="p-5"></p>
        {children}
    </>
  );
}
