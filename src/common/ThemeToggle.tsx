'use client'
import { useTheme } from "next-themes"

export default function ThemeToggle() {
    
    const {resolvedTheme, setTheme} = useTheme()
    
    const toggle = ()  => {
        if(resolvedTheme === 'dark') {
            setTheme('light')
        } else {
            setTheme('dark')
        }
    }
    return (
        <button onClick={toggle} className=" w-4 aspect-square bg-black dark:bg-white cursor-pointer rounded-xs" />
    )
}