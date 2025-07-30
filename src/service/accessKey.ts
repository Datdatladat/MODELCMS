import { api } from "@/lib/api";
import { getUserId } from "@/lib/auth";

export const getAccessKeys = async () => {
    const token = localStorage.getItem("accessToken");
    const userId = getUserId(token);
    const res = await api.get(`/api/access-keys/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}