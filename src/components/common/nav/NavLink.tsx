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

  const active = currentPath.startsWith(href)

  return (
    <NavigationMenuItem>
          <Link href={href} legacyBehavior passHref>
              <NavigationMenuLink className={`group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm transition font-bold hover:text-foreground ${active ? "text-foreground" : "text-muted-foreground"}`}>
                  {text}
              </NavigationMenuLink>
          </Link>
      </NavigationMenuItem>
  )
}
