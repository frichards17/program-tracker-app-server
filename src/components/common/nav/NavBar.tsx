'use client'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { NavigationMenu, NavigationMenuList } from '../../ui/navigation-menu'
import { hasClients, hasExercises, hasUsers } from '@/constants/roles'
import NavLink from './NavLink'
import ThemeToggle from '../ThemeToggle'
import CircleButton from '../CircleButton'

export default function NavBar() {

    const { data: session } = useSession()
    if (!session) {
        return null
    }
    var initials = null
    if (session.user.first_name && session.user.last_name) {
        initials = `${session.user.first_name?.charAt(0)}${session.user.last_name?.charAt(0)}`
    }
    const role = session.user.role_id

    const path = usePathname()


    return (
        <div className="flex flex-row justify-between items-center w-full px-8 py-4 bg-card">
            <div className="flex flex-row items-center space-x-4">
                <h1 className="font-extrabold text-5xl">PT</h1>
                <NavigationMenu className="w-full">
                    <NavigationMenuList>
                        <NavLink href='/dashboard' text='Dashboard' currentPath={path} />
                        {hasClients(role) ? <NavLink href='/clients' text='Clients' currentPath={path} /> : null}
                        {hasUsers(role) ? <NavLink href='/users' text='Users' currentPath={path} /> : null}
                        {hasExercises(role) ? <NavLink href='/exercises' text='Exercises' currentPath={path} /> : null}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className='flex flex-row space-x-4 items-center'>
            <ThemeToggle />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="w-12 h-12 overflow-hidden rounded-full items-center justify-center inline-flex align-middle transition">
                        <AvatarImage src={session.user.image ?? undefined} />
                        <AvatarFallback>
                            <CircleButton onClick={()=>null}>
                                <p className='select-none font-medium text-secondary-foreground'>{initials}</p>
                            </CircleButton>
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="items-end justify-end" align="end">
                    <DropdownMenuLabel>{session.user.first_name + " " + session.user.last_name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <PersonIcon className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => signOut()}>
                        <ExitIcon className="mr-2 h-4 w-4" />
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </div>
    )
}
