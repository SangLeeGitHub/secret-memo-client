import React, { Component } from 'react';
import PostView from './PostView';

export default class PostList extends Component {
  static defaultProps = {
    posts: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined'),
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.data !== this.props.data;
  }
  
  render() {
    console.log('render PostList');
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map(
      post => (
        <PostView
          key={post.id}
          post={post}
          onRemove={onRemove}
          onUpdate={onUpdate}
        />)
    );

    return (
      <div>
        {list}    
      </div>
    );
  }
}