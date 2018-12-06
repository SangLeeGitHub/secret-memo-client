import React, { Component } from 'react';
import './App.css';
import PostForm from './PostForm';
import PostList from './PostList';

class App extends Component {
  state = {posts: []}

  fetchAll()
  {
    fetch('/ids')
        .then(res => res.json())
        .then(posts => this.setState({ posts }));
  }

  componentDidMount() 
  {
    this.fetchAll();
  }

  handleCreate = (data) => {
    
    console.log("handleCreate()", data);

    fetch('/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) 
            {
              throw new Error("Bad response from server");
            }
            console.log("create - response:", response);
            this.fetchAll();
            return response.json();
        }).then((data) => {   
            console.log("create - data:", data);      
        }).catch((err) => {
            console.log(err);
        });
  };

  handleRemove = (id) => {

    console.log("handleRemove()", id);

    fetch('/delete/' + id)
        .then((response) => {
            if (response.status >= 400) 
            {
            throw new Error("Bad response from server");
            }
            console.log("delete - response:", response);
            this.fetchAll();
            return response.json();
        }).then((data) => {   
            console.log("delete - data:", data);      
        }).catch((err) => {
            console.log(err);
        });
  };

  handleUpdate = (id, data) => {

    var idData = {id, ...data};
    console.log("handleUpdate()", idData);

    fetch('/update', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(idData)
    }).then((response) => {
        if (response.status >= 400) 
        {
          throw new Error("Bad response from server");
        }
        console.log("update - response:", response);
        this.fetchAll();
        return response.json();
    }).then((data) => {   
        console.log("update - data:", data);      
    }).catch((err) => {
        console.log(err);
    });
  };

  render() 
  {
    const { posts } = this.state;  
    var divStyle = {'text-align': 'center'}
    return (
      <div>
        <div style={divStyle}>2018 아전모 건의사항</div>    
        <br/>
        <PostForm
            onCreate={this.handleCreate}
        />
        <hr />
        <h1>Posts</h1>
        <PostList
            data={posts}
            onRemove={this.handleRemove}
            onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;