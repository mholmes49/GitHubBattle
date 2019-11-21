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
            repos: null, //response when a language is selected
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
            repos: null
        })
        fetchPopularRepos(l)
            .then((repos)=> {
                this.setState( {
                    repos,
                    error: null
                })
            })
            .catch(()=> {
                console.warn("Error thrown when fetching repos");
                this.setState({
                    error: "Error fetching repos"
                })
            })

    }
    isLoading() {
        return this.state.repos === null && this.state.error === null;
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
                {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
            </React.Fragment>
        )
        
    }
}

