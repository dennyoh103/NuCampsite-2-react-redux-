import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { findRenderedComponentWithType } from 'react-dom/test-utils';


const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);

function RenderCampsite({ campsite }) {
    return (
        <div className='col-md-5 md-1'>
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>

    )
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className='col-md-5 md-1'>
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text} <br />
                            -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    )
                })}
                <CommentForm />
            </div>
        )
    }
    return (
        <div />
    )
}

class CommentForm extends Component {
    state = {
        isModalOpen: false,
        touched: {
            author: false,

        }
    }

    toggleModal = () =>
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });

    handleSubmit = (values) => {
        alert('Current state is: ' + JSON.stringify(values));
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <Button onClick={this.toggleModal} color='secondary' outline><i className='fa fa-pencil' />{' '}Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className='form-group'>
                                <Label htmlFor="rating" md={6}>Rating</Label>
                                <Col >
                                    <Control.select className='form-control' model='.rating' id="rating" name="rating">
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </Control.select>
                                </Col>
                            </div>
                            <div className='form-group'>
                                <Label htmlFor="author" md={6}>Your Name</Label>
                                <Col>
                                    <Control.text model='.author' id="author" name="author"
                                        placeholder="Your Name"
                                        className='form-control'
                                        validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </div>
                            <div className='form-group'>
                                <Label htmlFor="text" md={6}>Comment</Label>
                                <Col>
                                    <Control.textarea row='6' col='10' model='.text' id="text" name="text"
                                        className='form-control'
                                    />
                                </Col>
                            </div>
                            <div className='form-group'>
                                <Col>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </div>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}


function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className='container'>
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/directory'>Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return (
        <div />
    )
}


export default CampsiteInfo;