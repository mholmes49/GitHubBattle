import React from 'react'
import ReactDOM from 'react-dom'


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
        console.log(this.state.selectedLanguage)
        const langs = ["All","JavaScript","R","Java", "CSS","Python"];
        return (
            <ul className="flex-center">
                {langs.map((l,i)=> (
                    <li key={l}>
                        <button 
                            className="btn-clear nav-link"
                            style={l=== this.state.selectedLanguage? {color: 'rgb(187, 46,31)'}: null}
                            onClick={()=> this.updateLanguage(l)}>
                            {l}
                        </button>
                    </li>
                ))
                }
            </ul>
        )
    }
}

