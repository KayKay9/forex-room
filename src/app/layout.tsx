import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";

import TopLoader from "nextjs-toploader";
import { AuthContext } from "@/context/auth-context";

const poppins = Poppins({ weight: ["300", "500", "400", "600", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Forex Room",
    description: "Realtime Forex Chat Room application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={poppins.className}>
                <TopLoader color="#ffffff" height={1} zIndex={9999} showSpinner={false} />
                <AuthContext>
                    <Toaster />
                    {children}
                </AuthContext>
            </body>
        </html>
    );
}
