import { auth } from "@yts/api";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.isPrerendered) return next();

  const isAuthed = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
  } else {
    context.locals.user = null;
    context.locals.session = null;
  }

  if (
    new URL(context.request.url).pathname.startsWith("/app") &&
    !context.locals.session
  ) {
    // Redirect to login page if the user is not authenticated
    return context.redirect(
      `/login?next=${encodeURIComponent(context.url.pathname)}`,
    );
  }

  const authPages = ["/login", "/signup", "/verify"];
  if (authPages.includes(context.url.pathname) && context.locals.session) {
    return context.redirect("/app");
  }

  return next();
});
