import React from 'react';
import PageNavbar from './PageNavbar';
import ActorsRow from './ActorsRow';
import '../style/Actors.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popcorn from './popcorn.png';
import Trophy from './trophy.png';

export default class Actors extends React.Component {
	constructor(props) {
		super(props);

        this.state = {
			actor: "",
			topFives: []
		};

		this.handleActorChange = this.handleActorChange.bind(this);
		this.submitActor = this.submitActor.bind(this);
	};

	handleActorChange(e) {
		this.setState({
			actor: e.target.value
		});
        console.log(this.state);
	};

	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	submitActor() {
		fetch("http://localhost:8081/actors/" + this.state.actor, {
     	 	method: "GET", // The type of HTTP request.
    	})

		.then(res => res.json())
        .then(recList => {
            let topDivs = recList.map((topFives, i) => (
                <ActorsRow key={i} className="ActorsRow" topFives = {topFives}/>
            ));

            this.setState({
                topFives: topDivs,
            });
          })
          console.log(this.state);
	};

	
	render() {
		return (
            <>
			<div className="Actors">
				<PageNavbar active="actors" />

				<div className="container recommendations-container">
					<div className="jumbotron">
						
						<div className="popcorn" style={{textAlign: 'center'}}>
							<img src = {Trophy} width="130" height="130"/> 
							<img src = {Popcorn} width="120" height="130"/>
							<img src = {Trophy} width="130" height="130"/>
						</div>
						<br></br>
						<div className="h5" style={{textAlign: 'center', fontSize: 60}}>Top Fives</div>
						<br></br>
						<div className="input-container" style={{textAlign: 'center'}}>
							<input type='text' placeholder="Enter Actor Name" value={this.state.actor} onChange={this.handleActorChange} id="actor" className="actor-input"/>
							<button id="submitActorBtn" className="submit-actor" onClick={this.submitActor}>Submit</button>
						</div>
						<br></br>
						<div className="h5" style={{textAlign: 'center'}}>The top fives are...</div>
						<br></br>
						<table style={{textAlign: 'center', height: 80, width: 1080, justifyContent: 'center'}}>
                            <thead className="actorsTable-header" style={{fontSize: 18}}>
                                <tr>
                                    <th colspan="2">Top 5 Co-stars</th>
                                    <th colspan="2">Top 5 Most Profitable Movies</th>
                                    <th colspan="2">Top 5 Genres</th>
                                    <th colspan="2">Top 5 Production Companies</th>
                                </tr>
                            </thead>
                            <tbody>
                            	{this.state.topFives}
                            </tbody>
                        </table>
						{/* <div className="header-container">
							<div className="h6">Top Fives</div>
							<div className="headers">
								<div className="header"><strong>Top 5 Co-stars</strong></div>
								<div className="header"><strong>Top 5 Most Profitable Movies</strong></div>
								<div className="header"><strong>Top 5 Genres</strong></div>
								<div className="header"><strong>Top 5 Production Companies</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.topFives}
						</div> */}
					</div>
				</div>
			</div>
		</>
        );
	};
};