import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Swal from "sweetalert2";
import jwt_decode from "jwt-decode";
import { accessToken, User } from "../helpers/helperFunc";
import { useLocation } from "react-router-dom";
import "../styles/comments.css";

const state = { comment: "" };
const Comment = (props: any) => {
  const [data, setData] = useState(state);
  const [comments, setComment] = useState([]);

  const handleChange = (e: any) => {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  };

  const location = useLocation();
  const link = location.pathname;
  const index = link.lastIndexOf("/") + 1;
  const requestId = link.toString().slice(index);
  interface decoder {
    email: string;
    isAdmin: boolean;
    isAgent: boolean;
    name: string;
    _id: string;
  }
  let decoded: decoder = jwt_decode(accessToken);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const apiUrl = `${import.meta.env.VITE_APIURL}${requestId}`;
    fetch(apiUrl, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => Swal.fire("Done", data.message));
    window.location.reload();
  };

  const getComment = async () => {
    try {
      let response = await fetch(`${import.meta.env.VITE_RESPONSE}${requestId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.json();
    } catch (err) {
      console.error(err);
    }
  };

  //@ts-expect-error
  useEffect(async (): any => {
    let commentdatas = await getComment();
    setComment(commentdatas);
  }, []);
  //@ts-expect-error
  const commentData: any = comments?.data?.map((item: any) => {
    return (
      <div className="comment-section">
        <li className="comment-wrapper">
          <div className="comment2">
            <h5 className="ownerComment">
              <span className="initialComments">{User(decoded.name)}</span>{" "}
              {decoded.name}
            </h5>

            <p className="comments">
              <i className="fas fa-comment"></i> {item?.comment}
            </p>
          </div>
        </li>
      </div>
    );
  });

  return (
    <div className="commentSection">
      <Card bg="white" style={{ width: "65rem" }}>
        <Card.Header className="cardhead">
          <b>Comments</b>
        </Card.Header>
        <Card.Body className="cardbody">
          <div className="flexComment">
            <Form action="" onSubmit={handleSubmit}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label style={{ paddingTop: "20px" }}></Form.Label>
                <Form.Control
                  name="comment"
                  value={data.comment}
                  onChange={handleChange}
                  as="textarea"
                  rows={2}
                  className="comment-sect"
                  placeholder="Write a comment..."
                />
              </Form.Group>
              <Button className="cardbutton" type="submit">
                Comment
              </Button>
            </Form>
            <div className="otherComments">
              <ul className="cap">{commentData}</ul>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Comment;
