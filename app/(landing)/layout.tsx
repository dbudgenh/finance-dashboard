type Props = {
  children: React.ReactNode;
};

const LandingLayout = ({ children }: Props) => {
  return (
    <>
      <main className="container">{children}</main>
    </>
  );
};

export default LandingLayout;
