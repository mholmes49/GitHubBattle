import React from 'react'
import ReactDOM from 'react-dom'

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
export default class Popular extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedLanguage: "All"
        }

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(l) {
        this.setState({
            selectedLanguage: l
        })
    }

    render() {
        const {selectedLanguage} = this.state
        return(
            <React.Fragment>
                <LanguagesNav 
                    selected={selectedLanguage} 
                    onUpdateLanguage={this.updateLanguage}
                /> 
            </React.Fragment>
        )
        
    }
}

