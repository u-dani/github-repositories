import { api } from "./api"

export interface ISearchRepositoriesProps {
    language?: string
    license?: 'BSD Zero Clause License' | 'MIT License' | 'Apache License 2.0' | 'Creative Commons' | 'GNU General Public License'
    numberOfForks?: string
    numberOfStars?: string
    page?: number
    per_page?: number
    query: string
    topic?: string[]
}

export const searchRepositories = async ({page = 1, per_page = 20, ...props}: ISearchRepositoriesProps) => {
    let licenseAbbr;

    if (props.license) {    
        switch(props.license) {
            case 'BSD Zero Clause License':
                licenseAbbr = '0bsd'
                break
            
            case 'MIT License':
                licenseAbbr = 'mit'
                break
                
            case 'Apache License 2.0':
                licenseAbbr = 'apache-2.0'
                break

            case 'Creative Commons':
                licenseAbbr = 'cc'
                break

            case 'GNU General Public License':
                licenseAbbr = 'gpl'
                break
    }}

    const language = props.language ? `+language%3A${props.language}` : ''
    const license = licenseAbbr ? `+license%3A${licenseAbbr}` : ''
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