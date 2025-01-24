import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  // Set headers globally for all requests
  response.headers.set(
    "Accept-CH",
    "Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA-Model, Sec-CH-UA-Full-Version, Sec-CH-UA-Full-Version-List, Sec-CH-Prefers-Color-Scheme, Sec-CH-UA-Arch, Sec-CH-UA-Bitness"
  );

  response.headers.set(
    "Permissions-Policy",
    "ch-ua=*, ch-ua-mobile=*, ch-ua-platform=*, ch-ua-model=*, ch-ua-full-version=*, ch-ua-full-version-list=*, ch-prefers-color-scheme=*, ch-ua-arch=*, ch-ua-bitness=*"
  );

  return response;
}
