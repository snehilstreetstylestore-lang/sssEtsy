import { useMedusa } from "@/composable/useMedusa"

export const findCustomerByEmail = async (email: string) => {
  console.log("🔍 Searching Customer →", email)
  const { call } = useMedusa()

  const res = await call(`admin/customers?email=${encodeURIComponent(email)}`, {
    headers: { "x-use-admin": "true" }
  })

  console.log("👤 Search Response:", res)
  return res?.customers?.[0] ?? null
}

export const createCustomer = async (payload: any) => {
  console.log("🆕 Creating Customer Payload:", payload)
  const { call } = useMedusa()

  const existing = await findCustomerByEmail(payload.email)
  if (existing) {
    console.log("⚠️ Customer already exists:", existing.id)
    return existing
  }

  console.log("📌 Creating via Admin API…")

  const res = await call("admin/customers", {
    method: "POST",
    headers: { "x-use-admin": "true" },
    body: payload
  })

  console.log("🎉 Created Customer Response:", res)
  return res?.customer
}
