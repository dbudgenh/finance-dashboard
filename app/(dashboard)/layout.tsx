import { Header } from "@/components/header";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="max-w-screen-2xl mx-auto">{children}</main>
    </>
  );
};

export default DashboardLayout;
