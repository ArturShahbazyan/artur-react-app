import React from 'react';
import s from './addtask.module.css'

class AddTask extends React.Component {

    state = {
        value: ''
    }

    handleChange = (e) => {
        const {value} = e.target;
        this.setState({
            value
        })
    }

    render() {

        const {value} = this.state;
        const {onSubmit} = this.props;

        const handleSubmit = () => {
            onSubmit(value);
            this.setState({
                value:''
            })
        }


        return (
            <div className={s.add_task_col}>
                <input onChange={this.handleChange} type="text" placeholder="add a new todo..." value={value}/>
                <button onClick={handleSubmit}>Add</button>
            </div>
        )
    }
}

export default AddTask;