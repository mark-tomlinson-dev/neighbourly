import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

// Redux 
import { connect } from 'react-redux';
import { togglePopUpOnLogin } from "./../redux/actions/popUpActions";
import { savePostDataToStore, addNewPostToAllPostStore } from './../redux/actions/postActions';

// API
import { handlePost } from './../api/handlePost';

// Styles
import styles from './../sass/components/About.module.scss';

const LogStatusButton = (props) => {

  const handleDisableOnStatusButton = () => {
    
    let result = false

    if (props.latestPost === null || props.latestPost === undefined) {
      result = false
    } else if (props.latestPost[0]) {

      let latestPostCreatedAtDate = props.latestPost[0].createdAt;    
      let hours = moment().diff(moment(latestPostCreatedAtDate), 'hours');

      if (hours <= 24) {
        result = true
      }
    };

    return result
  };

  const handleStatusButtonOnClick = (currentUser) => {
    handlePost(props.currentUser).then((response) => {
      const newPost = response.data;
      props.savePostDataToStore(newPost);
      props.addNewPostToAllPostStore(newPost)
    })
    window.location.reload()
  };

  const handleStatusButtonWhenUserHasLoggedIn = (currentUser) => {  
    
    if (props.currentUser === null) {
      return (
        <Link to={"/signup"}><button className={styles.button} data-content="Please click to sign up"></button></Link>
      )
    } else {

      return (  
        <button className={styles.btn} disabled={handleDisableOnStatusButton()} onClick={handleStatusButtonOnClick} data-content="Yep, I sure did!">Yep, I sure did!</button>
      )
    }
  };

  return (
    <div className={styles.buttons}>
      {handleStatusButtonWhenUserHasLoggedIn()}
    </div>
    );
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    togglePopUpOnLogin: () => dispatch(togglePopUpOnLogin()),
    savePostDataToStore: (postData) => dispatch(savePostDataToStore(postData)),
    addNewPostToAllPostStore: (newPost) => dispatch(addNewPostToAllPostStore(newPost))
  };
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser,
    latestPost: state.postReducer.latestPost
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogStatusButton);