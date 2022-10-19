import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { deletePost } from "../actions";

export default function Modaldelete(props) {
  const post = useSelector((state) => state?.post?.currentPost);
  const dispatch = useDispatch();
  const performDelete = () => {
    dispatch(deletePost(post._id));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure you want to delete {post?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          By clicking confirm blog post{" "}
          <span className="text-danger fw-bold">{post?.title}</span> will be
          permanently deleted
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
            <Col md={4}>
              <Button variant="danger" onClick={() => performDelete()}>
                Confirm
              </Button>
            </Col>
            <Col md={{ span: 4, offset: 4 }}>
              <Button onClick={props.onHide} style={{ float: "right" }}>
                Close
              </Button>
            </Col>
          </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
}
