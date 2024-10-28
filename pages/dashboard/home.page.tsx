import NavbarComponent from "@/shared/components/Navbar/navbarComponent";
export default function Home() {
  return (
    <>
      <NavbarComponent />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">Welcome to your dashboard</h1>
      </div>
    </>
  );
}
