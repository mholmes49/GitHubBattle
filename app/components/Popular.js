import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from "prop-types"
import { fetchPopularRepos } from '../utils/api';

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
                {this.isLoading() && <p>LOADING!</p>}
                {error && <p>{error}</p>}
                {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>}
            </React.Fragment>
        )
        
    }
}

