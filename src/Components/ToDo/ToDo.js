import React, {Component} from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
import {Row, Container, Col, Button} from 'react-bootstrap';
import idGenerator from '../../helpers/idGenerator';
import Confirm from '../Modals/Confirm/Confirm';
import EditModal from "../Modals/EditModal/EditModal";

class ToDo extends Component {

    state = {
        tasks: [
            {
                _id: idGenerator(),
                title: 'React',
                description: 'React is an open-source, front end, JavaScript library.'
            },
            {
                _id: idGenerator(),
                title: 'Vue',
                description: 'Vue is an open-source model–view–viewModel front end JavaScript framework.'
            },
            {
                _id: idGenerator(),
                title: 'Angular',
                description: 'Angular is a TypeScript-based open-source web application framework.'
            }
        ],
        checkedTasks: new Set(),
        isModalOpen: false,
        editableTask: null
    }

    handleAdd = ({title, description}) => {
        if (!title || !description) return;
        const tasks = [...this.state.tasks];
        tasks.push({
                _id: idGenerator(),
                title,
                description
            }
        );

        this.setState({
            tasks: tasks
        })
    }

    handleDelete = (task_id) => {
        let tasks = [...this.state.tasks];
        tasks = tasks.filter((task) => task_id !== task._id)
        this.setState({
            tasks
        })
    }

    handleCheckedTasks = (task_id) => {

        let checkedTasks = this.state.checkedTasks;
        checkedTasks = new Set(checkedTasks);

        checkedTasks.has(task_id) ? checkedTasks.delete(task_id) : checkedTasks.add(task_id);

        this.setState({
            checkedTasks
        })
    }

    handleRemoveSelectedTasks = () => {

        const checkedTasks = this.state.checkedTasks;
        let tasks = [...this.state.tasks];

        checkedTasks.forEach((taskId) => {
                tasks = tasks.filter((task) => taskId !== task._id)
            }
        )

        this.setState({
            tasks,
            checkedTasks: new Set()
        })
    }

    handleSelectTasks = () => {

        const tasks = this.state.tasks;
        let checkedTasks = new Set(this.state.checkedTasks);

        !checkedTasks.size ?
            tasks.forEach((task) => {
                checkedTasks.add(task._id);
                this.setState({
                    checkedTasks
                })
            }) :
            this.setState({
                checkedTasks: new Set()
            })
    }

    handleToggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleToggleEditTask = (task) => {
        this.setState({
            editableTask: !this.state.editableTask ? task : null
        })
    }


    handleReceivedEditTask = (editedTask) => {

        let tasks = [...this.state.tasks];

        const idx = tasks.findIndex((task) => editedTask._id === task._id);
        tasks[idx] = editedTask;

        this.setState({
            tasks
        })
    }


    render() {

        const {
            checkedTasks,
            tasks,
            isModalOpen,
            editableTask
        } = this.state;

        const Tasks = tasks.map((task) => {
            return (
                <Col key={task._id}
                     xs={12}
                     md={6}
                     xl={4}
                     className="d-flex justify-content-center"
                >
                    <Task task={task}
                          handleDelete={this.handleDelete}
                          handleCheckedTasks={this.handleCheckedTasks}
                          disabled={!!checkedTasks.size}
                          checked={checkedTasks.has(task._id)}
                          handleToggleEditTask={this.handleToggleEditTask}
                    />
                </Col>
            )
        })

        return (
            <>
                <Container>
                    <Row>
                        <Col md={12}>
                            <AddTask onSubmit={this.handleAdd} disabled={!!checkedTasks.size}/>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        {!tasks.length && <div>Tasks is Empty</div>}
                        {Tasks}
                    </Row>
                    <Row className="mt-4">
                        <Col className="d-flex justify-content-center">
                            <Button
                                variant="danger"
                                onClick={this.handleToggleModal}
                                disabled={!!!checkedTasks.size}
                            >
                                Remove Selected
                            </Button>
                            <Button
                                variant="info"
                                className="ml-3"
                                onClick={this.handleSelectTasks}
                                disabled={!tasks.length}
                            >
                                {!checkedTasks.size ? "Select All" : "Unselect All"}
                            </Button>
                        </Col>
                    </Row>
                </Container>
                {
                    isModalOpen && <Confirm
                        onHide={this.handleToggleModal}
                        tasksCount={`Do you want to delete ${checkedTasks.size} tasks?`}
                        onDeleteTasks={this.handleRemoveSelectedTasks}

                    />
                }

                {
                    editableTask && <EditModal
                        handleToggleEditTask={this.handleToggleEditTask}
                        editableTask={editableTask}
                        handleReceivedEditTask={this.handleReceivedEditTask}
                    />
                }
            </>
        )
    }
}

export default ToDo;