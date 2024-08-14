import { NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import Link from 'next/link'
import React from 'react'

export default function NavLink({
    href,
    text,
    currentPath
}:{
    href: string,
    text: string,
    currentPath: string
}) {

  const active = currentPath === href

  return (
    <NavigationMenuItem>
          <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm transition hover:text-foreground hover:font-bold hover:scale-105 ${active ? "text-foreground font-bold" : "text-muted-foreground font-medium"}`}>
                  {text}
              </NavigationMenuLink>
          </Link>
      </NavigationMenuItem>
  )
}
