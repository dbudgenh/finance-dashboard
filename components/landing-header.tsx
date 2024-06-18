import { HeaderLogo } from "./header-logo";
import { LandingNavigation } from "./landing-navigation";

export const LandingHeader = () => {
    return (
      <header className="sticky top-0 z-10 bg-blue-500 border-neutral-700/80 backdrop-blur-lg border-b px-16">
        <div className="flex justify-between">
            <HeaderLogo/>
            <LandingNavigation/>
        </div>
      </header>
    );
  };