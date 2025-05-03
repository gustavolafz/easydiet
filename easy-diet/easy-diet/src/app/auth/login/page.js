import FormLogin from "@/components/Formlogin";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center min-h-screen justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/img-login.png')",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      <FormLogin />
    </main>
  );
}
