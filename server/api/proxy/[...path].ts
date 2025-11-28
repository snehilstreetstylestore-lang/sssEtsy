export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { path } = event.context.params!;

  console.log("🛠️ Proxy Hit →", path);

  const targetUrl = `${config.public.medusaUrl}/${path}`;
  console.log("➡️ Target URL:", targetUrl);

  const useAdminHeader = getHeader(event, "x-use-admin");
  console.log("🔍 x-use-admin Header:", useAdminHeader);

  const isAdminEndpoint =
    path.startsWith("admin/") || useAdminHeader === "true";

  console.log("🔑 Is Admin Endpoint:", isAdminEndpoint);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (isAdminEndpoint) {
    console.log("🚨 Using ADMIN Key");
    headers["Authorization"] = `Bearer ${config.medusaAdminKey}`;
  } else {
    console.log("🛍 Using PUBLISHABLE Key");
    headers["x-publishable-api-key"] = config.public.medusaPublishableKey;
  }

  let bodyData = null;
  if (["POST", "PUT", "PATCH"].includes(event.method || "")) {
    bodyData = await readBody(event);
    console.log("📦 Request Body:", bodyData);
  }

  try {
    const res = await $fetch.raw(targetUrl, {
      method: event.method,
      headers,
      body: bodyData,
    });

    console.log("✔️ Proxy Success:", res.status);
    return res._data;
  } catch (error: any) {
    console.error("🔥 Proxy Error Full:", {
      statusCode: error?.statusCode,
      message: error?.message,
      data: error?.data,
    });

    return {
      statusCode: error?.statusCode || 500,
      message: error?.message || "Proxy failed",
      error: true,
    };
  }
});
