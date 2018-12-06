import React, { Component } from 'react';

export default class Post extends Component {
    static defaultProps = {
        post: {
            text: '내용',
            password: '0000',
            id: 0
        },
    };

    state = {
        passwordMatch: false,
        // 우리는 수정 버튼을 눌렀을 떄 editing 값을 true 로 설정해줄것입니다.
        // 이 값이 true 일 때에는, 기존에 텍스트 형태로 보여주던 값들을
        // input 형태로 보여주게 됩니다.
        editing: false,
        // input 의 값은 유동적이겠지요? input 값을 담기 위해서 각 필드를 위한 값도
        // 설정합니다
        text: '',
        password: '',
    }

    handleRemove = () => {
        // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 호출
        const { post, onRemove } = this.props;
        onRemove(post.id);
    }

    // editing 값을 반전시키는 함수입니다
    // true -> false, false -> true
    handleToggleEdit = () => {
        const { editing } = this.state;
        this.setState({ editing: !editing });
        if (!editing) this.setState({ passwordMatch: false });
    }

    // input 에서 onChange 이벤트가 발생 될 때
    // 호출되는 함수입니다
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    
    handlePassword = (e) => {

        if (e.target.value === this.props.post.password) 
        {
            console.log("handlePassword:", true);
            this.setState({ passwordMatch: true });        
        }
        else
        {
            console.log("handlePassword:", false);
            this.setState({ passwordMatch: false });  
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
        // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
        // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.

        const { post, onUpdate } = this.props;
        if(!prevState.editing && this.state.editing) {
            // editing 값이 false -> true 로 전환 될 때
            // info 의 값을 state 에 넣어준다
            this.setState({
                text: post.text,
                password: post.password
            })
        }

        if (prevState.editing && !this.state.editing) {
            // editing 값이 true -> false 로 전환 될 때
            onUpdate(post.id, {
                text: this.state.text,
                password: this.state.password
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
        if (!this.state.editing  
            && !nextState.editing
            && nextProps.post === this.props.post
            && nextState.passwordMatch === this.state.passwordMatch) 
        {
            return false;
        }
        // 나머지 경우엔 리렌더링함
        return true;
    }

    render() {
        console.log("render()");
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px'
        }; // CSS

        const { editing } = this.state;

        if (editing) { // 수정모드
            return (
                <div style={style}>
                    <div>
                        <textarea                    
                            placeholder="저장할 내용"
                            value={this.state.text}
                            onChange={this.handleChange}
                            name="text" 
                            rows="10" cols="60">
                        </textarea>
                    </div>
                    <div>
                        <input
                            value={this.state.password}
                            name="password"
                            type="password"
                            placeholder="암호"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button onClick={this.handleToggleEdit}>적용</button>
                    <button onClick={this.handleRemove}>삭제</button>
                </div>
            );
        }

        // 일반모드
        const { id } = this.props.post;

        return (
            <div style={style}>
                <div><b>{id}번 건의사항 입니다.</b></div>
                <input
                    type="password"
                    placeholder="수정, 삭제를 위한 암호"
                    onChange={this.handlePassword}
                />
                <button onClick={this.handleToggleEdit} disabled={!this.state.passwordMatch}>수정</button>
                <button onClick={this.handleRemove} disabled={!this.state.passwordMatch}>삭제</button>
            </div>
        );
    }
}