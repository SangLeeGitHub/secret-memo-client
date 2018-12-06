import React, { Component } from 'react';

export default class PostForm extends Component {
    state = {
        password: '',
        text: ''
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };
    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);
        // 상태 초기화
        this.setState({
            password: '',
            text: ''
        })
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <textarea                    
                        placeholder="저장할 내용"
                        value={this.state.text}
                        onChange={this.handleChange}
                        name="text" 
                        rows="10" cols="30">
                    </textarea>
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="수정 암호"
                        value={this.state.password}
                        onChange={this.handleChange}
                        name="password"
                    />
                </div>
                <button type="submit">등록</button>
            </form>
        );
    } 
}