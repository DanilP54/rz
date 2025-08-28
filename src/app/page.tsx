import { AppLogoTheme } from "@/shared/AppLogo";
import { ROUTES } from "@/shared/model/routes";
import ThemeToggle from "@/shared/ThemeToggle";
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
          <Link href={ROUTES.rz.index}>rz</Link>
        </nav>
      </div>
    </div>
  );
}
