import React, { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import CircleButton from './CircleButton'

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    // Ensure component is mounted on client
    useEffect(() => {
        setMounted(true)
    })
    
    if(!mounted){
        return null
    }

    const toggleTheme = () => {
        if(resolvedTheme === 'dark'){
            setTheme('light')
        }else if(resolvedTheme === 'light'){
            setTheme('dark')
        }
    }

    return (
        <CircleButton onClick={toggleTheme}>
            {resolvedTheme == 'dark' ? <MoonIcon/> : <SunIcon/>}
        </CircleButton>
    )
}
