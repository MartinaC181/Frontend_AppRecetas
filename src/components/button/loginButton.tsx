import Link from "next/link"

import { Button } from "@/components/ui/button"

export function LoginButton() {
  return (
    <Button asChild>
      <Link href="/login">¡Proba ahora!</Link>
    </Button>
  )
}