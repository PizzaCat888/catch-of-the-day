import React from "react"
import {render} from "react-dom";



  const Header = (props) => {
        return (
            <header className="top">
                <h1> Catch
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the </span>
                    </span>
                     Day 
                </h1>
                <h3 className="tagline"> <span>{props.tagline} </span> </h3>
            </header>
        )

  }

//specfiy who the property types are, makes development easier in teams
Header.proptypes = {
    tagline: React.PropTypes.string.isRequired //if passing tagline, it must be a string
}


export default Header