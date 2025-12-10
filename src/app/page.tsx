import { AppLogoTheme } from "@/common/AppLogo";
import { ROUTES } from "@/common/model/routes";
import ThemeToggle from "@/common/ThemeToggle";
// import { Button } from "@adobe/react-spectrum";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-svh">
      <div className="p-3 justify-center items-center">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center grow gap-5">
        <AppLogoTheme size="large" />
        <nav className="flex justify-center gap-5 text-md font-bold [&_a]:hover:underline">
          <Link href={ROUTES.feed}>feed</Link>
          <Link href={ROUTES.radio}>rz radio</Link>
          <Link href={ROUTES.rz.root}>rz</Link>
        </nav>
      </div>
    </div>
  );
}
