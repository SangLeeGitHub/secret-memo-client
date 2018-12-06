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
        // 빈입력 방지
        if (this.state.password === '' || this.state.text === '') 
        {
            alert("빈입력은 허용되지 않습니다.");
            return;
        }
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);
        // 상태 초기화
        this.setState({
            password: '',
            text: ''
        })
    };
    render() {
        var formStyle = {'text-align': 'center'}
        return (
            <form onSubmit={this.handleSubmit} style={formStyle}>
                <div>
                    <textarea                    
                        placeholder="저장할 내용"
                        value={this.state.text}
                        onChange={this.handleChange}
                        name="text" 
                        rows="15" cols="75">
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
                    <button type="submit">등록</button>
                </div>
            </form>
        );
    } 
}