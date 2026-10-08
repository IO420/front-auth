"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import axios from "axios";
import { envConfig } from "./config";

if (!envConfig.apiUrl) {
  throw new Error("API URL is not defined in envConfig");
}

if (!envConfig.domain) {
  throw new Error("Domain URL is not defined in envConfig");
}

if (!envConfig.destination1) {
  throw new Error("Destination1 URL is not defined in envConfig");
}

if (!envConfig.destination2) {
  throw new Error("Destination2 URL is not defined in envConfig");
}

if (!envConfig.node) {
  throw new Error("Node is not defined in envConfig");
}

const defaultDestination = envConfig.destination1 as string;

const ALLOWED_DOMAINS: string[] = [
  defaultDestination,
  envConfig.destination2 as string,
];

export async function loginAction(formData: FormData, targetApp?: string) {
  const userName = formData.get("userName");
  const password = formData.get("password");

  const isProduction = envConfig.node === "production";

  try {
    const response = await axios.post(`${envConfig.apiUrl}/users/login`, {
      userName,
      password,
    });

    const { token } = response.data;

    if (!token) {
      return { error: "No se recibió un token válido del servidor" };
    }

    const cookieStore = await cookies();
    cookieStore.set("authToken", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      ...(isProduction && { domain: envConfig.domain }),
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || "Credenciales incorrectas";
    return { error: errorMessage };
  }

  let destination: string = defaultDestination;

  if (targetApp && ALLOWED_DOMAINS.includes(targetApp)) {
    destination = targetApp;
  }

  redirect(destination);
}
//IO
