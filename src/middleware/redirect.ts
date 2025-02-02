export default defineNuxtRouteMiddleware((to) => {
  console.log("Middleware triggered:", to.path);

  const blockedPaths = ["/blog/", "/projekte/", "/projekte", "/blog"];

  if (blockedPaths.includes(to.path)) {
    console.log("Redirecting to homepage");
    return navigateTo("/", { replace: true });
  }
});
