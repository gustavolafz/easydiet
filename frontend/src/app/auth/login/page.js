import { loginBackgroundBlur } from "@/lib/blurDataURL";
import FormLogin from "@/components/forms/Formlogin";
import Image from "next/image";

export const metadata = {
  title: "Login | EasyDiet",
  description: "Acesse sua conta no EasyDiet para gerenciar sua alimentação de forma personalizada.",
};

export default function Login() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen px-4">
      {/* Imagem de fundo otimizada */}
      <div className="absolute inset-0 z-0 bg-gray-900" aria-hidden="true">
        <Image
          src="/img-login.jpg"
          alt="Background"
          fill
          sizes="100vw"
          className="object-cover"
          quality={85}
          priority
          placeholder="blur"
          blurDataURL={loginBackgroundBlur}
        />
        <div className="absolute inset-0 bg-black/20" />
        {/* <div className="absolute inset-0 bg-black bg-opacity-20" /> */}
        {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}
      </div>

      {/* Conteúdo do formulário */}
      <div className="relative z-10">
        <FormLogin />
      </div>
    </main>
  );
}
