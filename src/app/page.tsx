import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
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

      <form className={styles.form}>
        <div className={styles.containerInput}>
          <label>Usuario</label>
          <input className={styles.input} type="text" />
        </div>

        <div className={styles.containerInput}>
          <label>Contraseña</label>
          <input className={styles.input} type="password" />
        </div>
        <button className={styles.LoginButton}>Iniciar sesión</button>
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
