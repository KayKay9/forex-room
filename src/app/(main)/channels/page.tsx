import { Logout } from "@/components/logout";

const ChatsPage = () => {
    return (
        <div className="w-full h-full flex items-center justify-center flex-col">
            <p className="text-accent-2">Select a channel to get conversation.</p>
            <Logout />
        </div>
    );
};

export default ChatsPage;
