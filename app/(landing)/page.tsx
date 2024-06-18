import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <>
      <div className="flex gap-x-2">
        <h1>Landing Page</h1>
        <Link href="/dashboard">
          <Button>Get started</Button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
