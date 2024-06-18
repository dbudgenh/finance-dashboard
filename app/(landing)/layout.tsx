import { LandingHeader } from "@/components/landing-header";

type Props = {
  children: React.ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  return (
    <>
      <LandingHeader/>
      <main className="container">{children}</main>
    </>
  );
};

export default LandingLayout;
