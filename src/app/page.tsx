"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { loginAction } from "./actions/auth";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const targetApp = searchParams.get("app") || undefined;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formData, targetApp);

    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <section className={styles.loginCard}>
      <Image
        src={"/ctrlbys.svg"}
        alt="background logo"
        width={300}
        height={300}
        className={styles.backgroundLogo}
        priority
      />

      <Image src={"/ctrlbys.svg"} alt="logo" width={75} height={75} />
      <h1 className={styles.text}>Bienvenido a CtrlBys</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p style={{ color: "red", fontSize: "1.2rem" }}>{error}</p>}

        <div className={styles.containerInput}>
          <label>Usuario</label>
          <input
            className={styles.input}
            name="userName"
            type="text"
            required
          />
        </div>

        <div className={styles.containerInput}>
          <label>Contraseña</label>
          <input
            className={styles.input}
            name="password"
            type="password"
            required
          />
        </div>

        <button type="submit" className={styles.LoginButton}>
          Iniciar sesión
        </button>
      </form>

      <Link className={styles.link} href={"#"}>
        ¿Olvidaste tu contraseña?
      </Link>
      <h5>
        ¿No tienes cuenta?
        <Link className={styles.link} href={"#"}>
          Registrate
        </Link>
      </h5>
    </section>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
//IO
