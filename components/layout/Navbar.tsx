'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Installation', href: '/services/installation' },
      { label: 'Maintenance Plans', href: '/services/maintenance' },
      { label: 'Aquascaping', href: '/services/aquascaping' },
      { label: '24/7 Emergency', href: '/services/emergency' },
    ],
  },
  { label: 'Livestock', href: '/shop' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Learn', href: '/learn' },
  { label: 'Service Areas', href: '/service-areas/west-palm-beach' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const pathname = usePathname()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => setMobileOpen(false), [pathname])

  const isHome = pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled || !isHome
          ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-navy/30'
          : 'bg-transparent'
      )}
    >
      {/* Top announcement bar */}
      <div className="bg-aqua text-white text-xs text-center py-1.5 px-4 hidden md:block">
        <span className="font-semibold">🐠 Free Consultation</span> — Call{' '}
        <a
          href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? '+15613887262'}`}
          className="underline font-bold"
        >
          (561) 388-7262
        </a>{' '}
        or{' '}
        <Link href="/quote" className="underline font-bold">
          book online →
        </Link>
      </div>

      <nav className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Aquaholic Home">
          <Image
            src="/Images/Hero_logo.PNG"
            alt="Aquaholic Aquarium Services"
            width={44}
            height={44}
            className="rounded-full object-cover"
            priority
          />
          <div className="hidden sm:block">
            <div className="font-display text-white font-bold text-base lg:text-lg leading-tight whitespace-nowrap">
              Aquaholic Aquarium Services
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1" role="menubar">
          {NAV_LINKS.map((link) => (
            <li
              key={link.href}
              role="none"
              className="relative"
              onMouseEnter={() => link.children && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.children ? (
                <>
                  <button
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === link.label}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      pathname.startsWith(link.href)
                        ? 'text-aqua'
                        : 'text-white/80 hover:text-white'
                    )}
                  >
                    {link.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                        role="menu"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className="block px-4 py-3 text-sm text-navy hover:bg-aqua/10 hover:text-aqua transition-colors font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  href={link.href}
                  role="menuitem"
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === link.href || pathname.startsWith(link.href + '/')
                      ? 'text-aqua'
                      : 'text-white/80 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? '+15613887262'}`}
            className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium transition-colors"
            aria-label="Call us"
          >
            <Phone className="h-4 w-4" />
            <span>(561) 388-7262</span>
          </a>
          <Button asChild size="sm" variant="gold">
            <Link href="/quote">Free Quote</Link>
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="text-white p-1"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-navy/98 border-t border-white/10"
          >
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-3 py-3 text-white font-medium text-base rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 space-y-1 mt-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-white/70 hover:text-white text-sm rounded-lg hover:bg-white/10 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Button asChild variant="default" className="w-full">
                  <Link href="/quote">Get Free Quote</Link>
                </Button>
                <Button asChild variant="outline-white" className="w-full">
                  <a href="tel:+15613887262">Call (561) 388-7262</a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
