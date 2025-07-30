import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Tomosia Inc.',
  description: 'Sign in to your account'
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen overflow-hidden">{children}</div>
}
