const allowedAdminEmail = process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAIL?.trim().toLowerCase() ?? ""

export function getAllowedAdminEmail() {
  return allowedAdminEmail
}

export function isAllowedAdminEmail(email: string | null | undefined) {
  if (!allowedAdminEmail) {
    return true
  }

  return (email ?? "").trim().toLowerCase() === allowedAdminEmail
}
