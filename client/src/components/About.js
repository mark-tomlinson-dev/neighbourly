import React from 'react';

import Feed from './../components/Feed';
import styles from '../sass/components/About.module.scss';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import LogStatusutton from './LogStatusButton';
import LogStatusButton from './LogStatusButton';

const About = (props) => {
  const currentUser = props.currentUser;



  return (
		<div className={styles.about}>
			<div className={styles.container}>
				<div className={styles.row}>
					<div className={styles.left}>
            {currentUser
              ? <div>
                  <h2 className={styles.title}>Hi <span>{currentUser.FirstName}!</span> Thanks for logging in. Did you self-isolate today? </h2>
                  <LogStatusButton />
                </div>
              : <div>
                  <h2 className={styles.title}>In a time of <span>global pandemic</span>, show your neighbours you care.</h2>
                </div>
            }

            
            {currentUser 
            ? <div>
                
              </div>
            : <div className={styles.buttons}> 
                <Link to={"/signup"} className={styles.btn} data-content="sign me up">
                  sign me up
                </Link>
                <Link to={"/login"} className={styles.btn} data-content="I already have an account">
                  I already have an account
                </Link>
              </div>
            }
            
            {/* <LogStatusButton /> */}
            <div className={styles.aboutText} >
              <p >The fight against COVID-19 depends on each of us doing the right thing. But in isolation it can be hard to see or feel the good we’re doing. Neighbourly is designed to change that. Through the simple daily click of a button, users can let their neighbours know they’re acting to protect the community. By visiting the page, they can easily visualise, and be inspired by, the effort of those around them. <span>This project was inspired by the ABC's 7.30 Report. <a target="_blank" href="https://www.youtube.com/watch?v=dJ1l5pGbFw0" alt="7.30 report video about how to stop the spread of covid-19">Watch the video here.</a></span>
              </p>
						</div>
					</div>
					<div className={styles.right}>
            {/* <LogStatusButton /> */}
            <a href="">Log out</a>
						<Feed />
					</div>
				</div>
			</div>
		</div>
	)
}

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
};

export default connect(mapStateToProps)(About);
