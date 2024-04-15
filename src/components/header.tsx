import logo from '@/assets/logo.svg'

export function Header() {
  return (
    <header className="flex h-72 items-center justify-center bg-imageHeader bg-cover">
      <img src={logo} alt="Logo Github Blog" />
    </header>
  )
}
