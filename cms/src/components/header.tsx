import { UserButton } from '@clerk/nextjs'

export function MainHeader() {
    return (
        <nav>
          
            < UserButton afterSignOutUrl='/' />
        </nav>
    )
}