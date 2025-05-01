import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const currentUserr = async () => {
    const session = await getServerSession(authOptions);
    return session?.user;
}