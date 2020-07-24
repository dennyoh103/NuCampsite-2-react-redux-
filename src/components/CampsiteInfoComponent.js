import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col, Row, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl'


const minLength = len => val => val && (val.length >= len);
const maxLength = len => val => !val || (val.length <= len);

function RenderCampsite({ campsite }) {
    return (
        <div className='col-md-5 md-1'>
            <Card>
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>

    )
}

function RenderComments({ comments, addComment, campsiteId }) {
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
                <CommentForm campsiteId={campsiteId} addComment={addComment} />
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
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text)
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <Button onClick={this.toggleModal} color='secondary' outline>
                    <i className='fa fa-pencil' />{' '}Submit Comment
                </Button>

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
    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
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
                    <RenderComments
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
    return (
        <div />
    )
}


export default CampsiteInfo;