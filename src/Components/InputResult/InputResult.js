import {Button, Form} from "react-bootstrap";
import React from "react";
import {connect} from "react-redux";

const InputResult = ({setText, text, resetInput}) => {
    return (
        <div className="mt-5">

            <Form.Control
                className="w-50 m-auto"
                type="text"
                placeholder="Some text..."
                name="title"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <p className="mt-3">{text}</p>
            <Button
                className="mt-3 w-25"
                variant="outline-info"
                onClick={resetInput}
            >
                Reset
            </Button>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        text:state.text
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setText:(text) => dispatch({type:"setText", text}),
        resetInput:() => dispatch({type:"resetInput"}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputResult);