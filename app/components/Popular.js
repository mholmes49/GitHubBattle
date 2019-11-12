import React from 'react'
import ReactDOM from 'react-dom'


export default class Popular extends React.Component {

    render() {
        const langs = ["JavaScript","R","Java", "CSS","Python"];
        return (
            <ul className="flex-center">
                {langs.map((l,i)=> (
                    <li key={l}>
                        <button className="btn-clear nav-link">
                            {l}
                            </button>
                    </li>
                ))
                }
            </ul>
        )
    }
}

