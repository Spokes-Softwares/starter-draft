'use client'

import { Button } from "@repo/ui/components/shadcn-ui/button"

export default function SignOutButton({handleSignOut}:{handleSignOut:() => Promise<void>}){
    return(
        <Button onClick={()=>void handleSignOut()}>Sign Out</Button>
    )
}