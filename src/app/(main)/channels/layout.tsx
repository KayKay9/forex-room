import { getCurrentUser } from "@/actions/db/get-current-user";


import { redirect } from "next/navigation";

const ChannelsLayout = async ({ children }: { children: React.ReactNode }) => {
    const currUser = await getCurrentUser();

    if (!currUser) {
        return redirect("/");
    }

    return (
        // <SocketProvider>
            <div className="w-full h-full flex relative">
                {children}
            </div>
        // </SocketProvider>
    );
};

export default ChannelsLayout;
