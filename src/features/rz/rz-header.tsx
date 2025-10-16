import { GlobalSearchButton } from "@/shared/GlobalSearchButton";
import { AppLogoTheme } from "@/shared/AppLogo";
import { SideBarMobile } from "@/shared/SideBarMobile";
import { Menu } from "lucide-react";


export function RzHeader() {

  return (
  <header id="header" className={`grid grid-rows-2 sm:grid-rows-1 grid-cols-2 sm:grid-cols-[3fr_150px_min-content] items-center px-2 py-2 gap-2 sm:gap-10`}>
      <div className=" justify-self-start">
        <AppLogoTheme size="small" />
      </div>
      <div className="justify-self-end sm:order-1 flex place-items-center">
        <SideBarMobile
          trigger={<Menu strokeWidth={3} />}
          content={<div></div>}
        />
      </div>
      <div className="col-span-2 sm:col-auto w-full">
        <GlobalSearchButton />
      </div>
    </header>
  );
}





