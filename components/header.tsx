import { HeaderLogo } from "@/components/header-logo";
import { Navigation } from "@/components/navigation";
import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { WelcomeMsg } from "@/components/welcome-msg";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 py-8 pb-36">
      <div className="container">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-centerlg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" showName={false} />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 text-slate-400 animate-spin" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
};
