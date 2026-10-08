import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { envConfig } from "./app/actions/config";

if (!envConfig.destination1) {
  throw new Error("Destination1 URL is not defined in envConfig");
}

if (!envConfig.destination2) {
  throw new Error("Destination2 URL is not defined in envConfig");
}

const ALLOWED_DOMAINS = [envConfig.destination1, envConfig.destination2];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;

  if (token) {
    const targetApp = request.nextUrl.searchParams.get("app");

    let destination = envConfig.destination1 as string;

    if (targetApp && ALLOWED_DOMAINS.includes(targetApp)) {
      destination = targetApp;
    }

    return NextResponse.redirect(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
//IO
