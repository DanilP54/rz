import React from "react"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet"

type Props = {
    trigger: React.ReactNode
    content: React.ReactNode
}

export function SideBarMobile(props: Props) {
    return (
        <Sheet>
            <SheetTrigger className="text-foreground">{props.trigger}</SheetTrigger>
            <SheetContent>
                <SheetTitle className="hidden">side bar navigation, change theme, auth, account</SheetTitle>
                {props.content}
            </SheetContent>
        </Sheet>
    )
}