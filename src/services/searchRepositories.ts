import { api } from "./api"

type licensesKeys = 'BSD Zero Clause License' | 'MIT License' | 'Apache License 2.0' | 'Creative Commons' | 'GNU General Public License'

export const licenses: { [key in licensesKeys | string]: {parameter: string} } = {
    'BSD Zero Clause License': {parameter: '0bsd'},
    "MIT License": {parameter: 'mit'},
    "Apache License 2.0": {parameter: 'apache-2.0'},
    "Creative Commons": {parameter: 'cc'},
    "GNU General Public License": {parameter: 'gpl'}
}

export interface ISearchRepositoriesProps {
    language?: string
    license?: licensesKeys | string
    numberOfForks?: string
    numberOfStars?: string
    page?: number
    per_page?: number
    query: string
    topic?: string[]
}

export const searchRepositories = async ({page = 1, per_page = 20, ...props}: ISearchRepositoriesProps) => {
    const language = props.language ? `+language%3A${props.language}` : ''
    const license = props.license ? `+license%3A${licenses[props.license].parameter}` : ''
    const forks = props.numberOfForks ? `+forks%3A${props.numberOfForks}` : ''
    const stars = props.numberOfStars ? `+stars%3A${props.numberOfStars}` : ''
    const topic = props.topic ? props.topic.reduce((acc, cv) => acc + `+topic%3A${cv}` , '') : ''

    const searchParams = `q=${props.query}${language}${license}${forks}${stars}${topic}&page=${page}&per_page=${per_page}`

    const { data } = await api.get(`/search/repositories?${searchParams}`)
    return data
}

/* 
    Licenses
        BSD Zero Clause License     | 0bsd
        MIT License                 | mit
        Apache License 2.0          | apache-2.0
        Creative Commons            | cc
        GNU General Public License  | gpl
*/