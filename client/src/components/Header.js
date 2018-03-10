import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';


class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			// Show nothing when loading
			case null:
				return;
			// Show login
			case false:
				return <li><a href="/auth/google">Login with google</a></li>
			// Show whos logged in
			default:
				return [
					<li key="1"><Payments/></li>,
					<li key="2" style={{ margin: '0 10px'}}>
						Credits: {this.props.auth.credits}
					</li>,
					<li key="3"><a href="/api/logout">Logout</a></li>
				];
		}
	}

	render(){
		return (
			<nav>
		    <div className="nav-wrapper">
		      <Link
      			to={ this.props.auth ? '/surveys' : '/' }
      			className="left brand-logo">The experiment</Link>
		      <ul id="nav-mobile" className="right">
		        {this.renderContent()}
		      </ul>
		    </div>
		  </nav>
		);
	}
}

function mapStateToProps({auth}){
	return { auth };
}

export default connect(mapStateToProps)(Header);