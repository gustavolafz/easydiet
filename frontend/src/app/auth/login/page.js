import FormLogin from "@/components/forms/Formlogin";


export const metadata = {
  title: "Login",
  description: "página de login do app EasyDiet",
};


export default function Login() {
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
