import { api } from "./api"

interface ISearchUserResponse {
    avatar_url: string
    bio: string
    blog: string
    company: string
    followers: string
    followers_url: string
    following: string
    following_url: string
    html_url: string
    id: string
    location: string
}

export const searchUser = async(username: string): Promise<ISearchUserResponse> => {
    const { data } = await api.get(`/users/${username}`)
    return data
}