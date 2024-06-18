import { Metadata } from "next";

type Props = {
    children: React.ReactNode;
};
export const metadata: Metadata = {
  title: 'Categories',
};

export default function Layout({children} : Props) {

    return (
        <>
        {children}
        </>
    )
}