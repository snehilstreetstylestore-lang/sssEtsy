import { useRuntimeConfig } from '#imports'

export const useMedusa = () => {
  const call = async (
    endpoint: string,
    options: any = {}
  ) => {
    const isAdmin = endpoint.startsWith("admin/")

    const response = await $fetch(`/api/proxy/${endpoint}`, {
      method: options.method || "GET",
      body: options.body,
      headers: {
        "Content-Type": "application/json",
        // Tell proxy which auth to apply
        "x-use-admin": isAdmin ? "true" : "false",
        ...(options.headers || {})
      }
    })

    return response
  }

  return { call }
}
