import { api } from "./api"

export interface ISearchUserRepositories {
    description: string
    homepage: string
    html_url: string
    id: number
    language: string | null
    license: { name: string } | null
    name: string
    topics: string[] // https://github.com/topics/gan
    forks_count: number
    stargazers_count: number
}

interface ISearchUserProps {
    username: string
    page?: number
    per_page?: number
}

export const searchUserRepositories = async ({username, page, per_page}: ISearchUserProps): Promise<ISearchUserRepositories[]> => {
    const { data } = await api.get(`/users/${username}/repos?page=${page ?? 1}&per_page=${per_page ?? 15}`)
    return data
}