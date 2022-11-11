import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUser } from "../actions";

export default function ModalProfile(props) {
  console.log(useSelector((state) => state?.loginReducer?.currentUser));
  const currentUser = useSelector((state) => state?.loginReducer?.currentUser);
  const dispatch = useDispatch();

  const [name, setName] = useState(currentUser?.username);
  const [emailId, setEmailId] = useState(currentUser?.email);
  const [profilePic, setprofilePic] = useState(currentUser?.profilePicture);
  const [coverPic, setCoverPic] = useState(currentUser?.coverPicture);
  const [picLoading, setPicLoading] = useState(false);
  const [coverLoading, setCoverLoading] = useState(false);
  const [phone, setPhone] = useState(currentUser?.phoneNo);
  const [edu, setEdu] = useState(currentUser?.education);
  const [homeCity, setCity] = useState(currentUser?.city);
  const [homeTown, setTown] = useState(currentUser?.town);
  const [relation, setRelation] = useState(currentUser?.relationStatus);

  const postDetails = async (pic, e) => {
    e.target.name === "profilepic" ? setPicLoading(true) : setPicLoading(false);
    e.target.name === "coverpic"
      ? setCoverLoading(true)
      : setCoverLoading(false);
    if (pic === undefined) {
      toast.error("Please select an image", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/jpg" ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("api_key", "719368821484965");
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dk0sqc1u9");
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dk0sqc1u9/image/upload",
          data
        );
        if (e.target.name === "profilepic") {
          setprofilePic(res.data.url);
          setPicLoading(false);
        } else if (e.target.name === "coverpic") {
          console.log(res.data.url);
          setCoverPic(res.data.url);
          setCoverLoading(false);
        }
        toast.success("image uploaded successfully", {
          position: "bottom-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        toast.error(error?.response?.data?.error?.message, {
          position: "bottom-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
        });
        setPicLoading(false);
        setCoverLoading(false);
      }
    } else {
      toast.error("Please select a image", {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  /* console.log(
    `picloading:${picLoading},\ncoverloading:${coverLoading},\nprofilepicture:${profilePic},\ncoverpicture:${coverPic}`
  ); */
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      username: name,
      email: emailId,
      phoneNo: phone,
      profilePicture: profilePic,
      coverPicture: coverPic,
      city: homeCity,
      town: homeTown,
      relationStatus: relation,
      education: edu,
      _id: currentUser?._id,
    };
    dispatch(updateUser(updatedUser));
    props.onHide();
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update your profile details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Profile pic</Form.Label>
              <Form.Control
                type="file"
                placeholder="insert image"
                name="profilepic"
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0], e)}
              />
              {picLoading && (
                <div
                  className="spinner-border spinner-border-sm ms-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cover pic</Form.Label>
              <Form.Control
                type="file"
                placeholder="insert image"
                accept="image/*"
                name="coverpic"
                onChange={(e) => postDetails(e.target.files[0], e)}
              />
              {coverLoading && (
                <div
                  className="spinner-border spinner-border-sm ms-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="user name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone no</Form.Label>
              <Form.Control
                type="number"
                placeholder="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Education</Form.Label>
              <Form.Control
                type="text"
                placeholder="education"
                value={edu}
                onChange={(e) => setEdu(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="city"
                value={homeCity}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Town</Form.Label>
              <Form.Control
                type="text"
                placeholder="town"
                value={homeTown}
                onChange={(e) => setTown(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Relationship status</Form.Label>
              {["radio"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="Maried"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                    checked={relation === "married"}
                    onChange={() => setRelation("married")}
                  />
                  <Form.Check
                    inline
                    label="Single"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                    checked={relation === "single"}
                    onChange={() => setRelation("single")}
                  />
                </div>
              ))}
            </Form.Group>
            <Modal.Footer>
              <Container>
                <Row>
                  <Col md={4} xs={6}>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Col>
                  <Col md={{ span: 4 }} xs={{ span: 6, offset: 0 }}>
                    <Button onClick={props.onHide} style={{ float: "right" }}>
                      Close
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}
