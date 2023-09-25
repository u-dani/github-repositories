import { api } from "./api"

export const searchRepositories = async (query: string) => {
    const { data } = await api.get(`/search/repositories?q=${query}`)
    return data
}