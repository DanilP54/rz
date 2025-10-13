import { AppLogoTheme } from "@/shared/AppLogo";
import { GlobalSearchButton } from "@/shared/GlobalSearchButton";
import { getColorOfSegment } from "@/shared/lib/segment-bg-colors";
import { SideBarMobile } from "@/shared/SideBarMobile";
import ThemeToggle from "@/shared/ThemeToggle";
import { Menu } from "lucide-react";
import { NavSegments } from "@/shared/model/routes";
import React from "react";

export default async function Layout({
    params,
    children,
}: Readonly<{
    params: Promise<{ segment: NavSegments }>,
    children: React.ReactNode;
}>) {
    const { segment } = await params
    return (
        <div className={`${getColorOfSegment(segment)} flex flex-col h-screen text-black overflow-auto`}>
            <Header />
            {/* {!fullscreen && <DetailsHeader variant={variant} />} */}
            <div className="grow grid grid-cols-1 p-3 justify-center sm:p-0 sm:justify-normal sm:grid-cols-[1fr_6fr_1fr] lg:grid-cols-[1fr_3fr_1fr]">
                <section className="hidden sm:block bg-neutral-800 p-5 text-neutral-300">
                    {/* {!fullscreen && <RouteBackButton />} */}
                </section>
                <main className="bg-background rounded-xs shadow-2xl shadow-black/70 ">{children}</main>
                <section className="hidden sm:block bg-neutral-800"></section>
            </div>
        </div>

    )
}

function Header() {
    return (
        <header className={`w-full bg-background p-2 flex items-center justify-between gap-3.5 sticky top-0`}>
            <AppLogoTheme size="small" />
            <div className="">
                <SideBarMobile trigger={<Menu />} content={<div></div>} />
            </div>
            <div className="hidden lg:flex items-center gap-3">
                {/* <NavIconFeed />
                <NavIconRadio showLabelOnHover="right" /> */}
            </div>
            <div className="hidden lg:block">
                <ThemeToggle />
            </div>
            <div className="hidden lg:block">
                {/* <LanguageSwitcher /> */}
            </div>
            <div className="hidden lg:block">
                <GlobalSearchButton />
            </div>
        </header>
    )
}