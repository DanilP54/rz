import { AppLogoTheme } from "@/common/AppLogo";
import ThemeToggle from "@/common/ThemeToggle";
import { routes } from "@/common/model/routes";
import Link from "next/link";

export default async function Home() {
  return (
      <div className="flex flex-col h-svh">
        <div className="p-3 justify-center items-center">
          <ThemeToggle />
        </div>
        <div className="flex flex-col items-center justify-center grow gap-5">
          <AppLogoTheme size="large" />
          <nav className="flex justify-center gap-5 text-md font-bold [&_a]:hover:underline">
            <Link href={routes.feed()}>feed</Link>
            <Link href={routes.radio()}>rz radio</Link>
            <Link href={routes.rz()}>rz</Link>
          </nav>
        </div>
      </div>
  );
}
