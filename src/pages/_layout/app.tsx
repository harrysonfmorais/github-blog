import { Header } from '@/components/header'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <main className="mx-auto flex w-full max-w-[864px] flex-1">
        <Outlet />
      </main>
    </div>
  )
}
