export interface HeaderProps {
  cartCount: number
  currentPage?: string
  onNavigate: (page: string) => void
  onToggleMobileMenu: () => void
}
