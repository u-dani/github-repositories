import { api } from "./api"

export const searchUser = async(username: string) => {
    const { data } = await api.get(`/users/${username}`)
    return data
}