import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definiera publica rutter
const isPublicRoute = createRouteMatcher([
  "/",
  "/courses",
  "/course-preview/(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/dashboard(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (isPublicRoute(request)) {
    return; // Tillåt publica rutter utan autentisering
  }

  // Skydda alla andra rutter (inklusive `/dashboard`)
  await auth.protect();
});

export const config = {
  matcher: [
    // Matcha alla rutter förutom interna Next.js-filer och statiska resurser
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)", // Matcha API-rutter separat
  ],
};
