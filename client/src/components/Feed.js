import React, {useState} from 'react';

// API Calls
import { getLimitedPosts } from './../api/handlePost';

// Redux 
import { connect } from 'react-redux';
import { addNewPostToAllPostStore } from './../redux/actions/postActions';

// Components
import LogStatus from './LogStatus';
import LogStatusButton from './LogStatusButton';

// Styles
import styles from './../sass/components/Feed.module.scss';

const Feed = (props) => {
  
  const handleAllPosts = () => {

    if (props.allPosts) {

      let posts = props.allPosts;
      
      posts.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      posts = props.allPosts.map((post) => {

        const userId = post.User;
        const claps = post.Claps;
        const createdAt = post.createdAt;
        const suburb = post.Suburb;
        const postId = post._id;
        
        return (
          <div key={post._id}>
            <LogStatus postId={postId} user={userId} createdAt={createdAt} suburb={suburb} claps={claps} />
          </div>
        )
      });

      return posts

    } 
    
    
    
    else {
      return (
        <div className={styles.noPostsContainer}>
          <h1> Loading... </h1>
        </div>
      )
    }
  };

  return (
    <div className={styles.feed} >
      <div className={styles.logFeedContainer}>
        {/* <LogStatusButton /> */}
        {handleAllPosts()}
      </div>
    </div>
  );
};

// Below calls dispatch with redux store. 
const mapDispatchToProps = (dispatch) => {
  return {
    addNewPostToAllPostStore: (newPost) => dispatch(addNewPostToAllPostStore(newPost))
  }
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser,
    allPosts: state.postReducer.allPosts,
    filteredPosts: state.postReducer.filteredPosts
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);