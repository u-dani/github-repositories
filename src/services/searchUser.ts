import { api } from "./api"

export interface ISearchUserResponse {
    avatar_url: string
    bio: string | null
    blog: string
    company: string | null
    email: string | null
    followers: number
    followers_url: string
    following: number
    following_url: string
    html_url: string
    id: number
    location: string | null
    name: string
    twitter_username: string | null
}

export const searchUser = async(username: string): Promise<ISearchUserResponse> => {
    const { data } = await api.get(`/users/${username}`)
    return data
}