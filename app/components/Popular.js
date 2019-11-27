import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from "prop-types"
import { fetchPopularRepos } from '../utils/api';
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from "./Card"
import Loading from "./Loading"

function ReposGrid({repos}) {
    //loop the repos and make a car for each repo returned
    return (
        <ul className = 'grid space-around'>
            {
                repos.map((r, i) => {
                    const {name, owner, html_url, stargazers_count, forks, open_issues} = r;
                    const {login, avatar_url} = owner;

                    return (
                        <li key={html_url}>
                            <Card
                                header={`#${i+1}`}
                                avatar={avatar_url}
                                href={html_url}
                                name={login}
                            >
                                <ul className="card-list">
                                    <li>
                                        <FaUser color='rgb(255, 215, 0)' size={22}/>
                                        <a href={'https://github.com/${login}'}>
                                            {login}
                                        </a>
                                    </li>
                                    <li>
                                        <FaStar color='rgb(255, 215, 0)' size={22}/>
                                        {stargazers_count.toLocaleString()} stars
                                    </li>
                                    <li>
                                        <FaCodeBranch color='rgb(255, 215, 0)' size={22}/>
                                        {forks.toLocaleString()} forks
                                    </li>
                                    <li>
                                        <FaExclamationTriangle color='rgb(255, 215, 0)' size={22}/>
                                        {open_issues.toLocaleString()} issues
                                    </li>
                                </ul>
                            </Card>
                        </li>
                    )
                })
            }
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

function LanguagesNav({selected, onUpdateLanguage}) {
    const langs = ["All", "JavaScript","R","Java", "CSS","Python"];
    return (
        <ul className="flex-center">
            {langs.map((l,i)=> (
                <li key={l}>
                    <button 
                        className="btn-clear nav-link"
                        style={l=== selected ? {color: 'rgb(187, 46,31)'}: null}
                        onClick={()=> onUpdateLanguage(l)}>
                        {l}
                    </button>
                </li>
            ))
            }
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string,
    onUpdateLanguage: PropTypes.func
}

export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: "All",
            repos: {}, //response when a language is selected
            error: null
        }

        this.updateLanguage = this.updateLanguage.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(l) {
        this.setState({
            selectedLanguage: l,
            error: null, //show loading screen
        })
        if(!this.state.repos[l]) {
            fetchPopularRepos(l)
                .then((data)=> {
                    this.setState( ({repos})=> ({
                        repos: {
                            ...repos,
                            [l]: data
                        }
                    }))
                })
                .catch(()=> {
                    console.warn("Error thrown when fetching repos");
                    this.setState({
                        error: "Error fetching repos"
                    })
                })
        }
        

    }
    isLoading() {
        const {repos, selectedLanguage,error} = this.state
        return !repos[selectedLanguage] && error === null;
    }
    render() {
        const {selectedLanguage, repos, error} = this.state
        return(
            <React.Fragment>
                <LanguagesNav 
                    selected={selectedLanguage} 
                    onUpdateLanguage={this.updateLanguage}
                /> 
                {this.isLoading() && <Loading text="Loading Repos"/>}
                {error && <p className="center-text error">{error}</p>}
                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]}/>}
            </React.Fragment>
        )
        
    }
}

