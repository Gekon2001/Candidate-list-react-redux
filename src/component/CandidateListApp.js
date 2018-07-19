import React from 'react';

import CandidateListAppInfo from "./CandidateListAppInfo"
import "../style/style.css";

class CandidateListApp extends React.Component {
  	constructor(props) {
      super(props);
      this.state= {turnOn: false}

       this.handleOnClick = () => {
        this.setState({
          turnOn: !this.state.turnOn
        });
    };
    };

  	
  	
  	render() {
  		if (!this.state.turnOn) {
  			return (
  				<button className="candidate-list-app-load" onClick={()=>{this.handleOnClick()}}>
  					Загрузить данные
  				</button>
  			)} else 
  			return (
  				<div className="candidate-list-app">
    				<button className="candidate-list-app-exit" onClick={()=>{this.handleOnClick()}}>Х</button>	
			    	<CandidateListAppInfo/>
    			</div>
  			)
  		}
  	
 }


export default CandidateListApp;
