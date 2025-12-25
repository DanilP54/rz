import { AppLogoTheme } from "@/common/AppLogo";
import { SideBarMobile } from "@/common/SideBarMobile";
import { Menu } from "lucide-react";

export function DetailsRzHeader() {
  return (
    <header
      className={`w-full bg-background p-2 flex items-center justify-between gap-3.5 sticky top-0`}
    >
      <AppLogoTheme size="small" />
      <div className="">
        <SideBarMobile trigger={<Menu />} content={<div></div>} />
      </div>
      <div className="hidden lg:flex items-center gap-3">
        {/* <NavIconFeed />
                <NavIconRadio showLabelOnHover="right" /> */}
      </div>
      <div className="hidden lg:block">{/* <ThemeToggle /> */}</div>
      <div className="hidden lg:block">{/* <LanguageSwitcher /> */}</div>
      <div className="hidden lg:block">{/* <GlobalSearchButton /> */}</div>
    </header>
  );
}
