import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./BlogDetails.scss";
import { DropzoneDialog } from "material-ui-dropzone";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/action";

let user
export default function BlogDetails(props) {
  const [blogDetailId, setBlogDetailId] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { blogDetail } = useSelector(
    (state) => ({
      blogDetail: state.blogDetail,
    }),
    shallowEqual
  );
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("user"))
    if (props.match.params.id) {
      dispatch(actions.fetchBlogDetailId(props.match.params.id)).then((res) => {
        const { response_data } = res.data;

        if (response_data) {
          setBlogDetailId({
            title: response_data?.blog_title,
            description: response_data?.blog_description,
            // file: blogDetail?.blog_url,
          });
        }
      });
    }
  }, [dispatch]);
  const [openDropzone, setOpenDropzone] = useState(false);

  const handleChange = (e) => {
    setBlogDetailId({
      ...blogDetailId,
      [e.target.name]: e.target.value,
    });
    setOpenDropzone(false);
  };
  const saveImage = (files) => {
    setBlogDetailId({
      ...blogDetailId,
      file: files[0],
    });
    setOpenDropzone(false);
  };

  const handleClose = () => {
    setOpenDropzone(false);
  };

  const handleAddEdit = () => {
    if (props.match.params.id) {
      dispatch(
        actions.updateBlog(
          props.match.params.id,
          blogDetailId?.title,
          blogDetailId?.description
        )
      ).then((res) => {
        if (res) history.push("/blogs/all");
      });
    } else {
      dispatch(
        actions.addBlog(
          blogDetailId.title,
          blogDetailId.description,
          blogDetailId.file
        )
      ).then((res) => {
        if (res && res.data.success) history.push("/blogs/all");
      });
    }
  };
  return (
    <div className="d-flex border justify-content-center align-items-center p-5">
      <form>
        <div className="form-group">
          <label for="exampleFormControlInput1">Title</label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter title"
            name="title"
            value={blogDetailId.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={blogDetailId.description}
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>
        {/* <div className="form-group">
          <Button
            className="add-image mr-5 d-flex align-items-center justify-content-center"
            size="medium"
            color="primary"
            onClick={() => setOpenDropzone(true)}
          >
            <AddIcon />
            <p className="mb-0">Add Image</p>
          </Button>
          <DropzoneDialog
            open={openDropzone}
            onSave={saveImage}
            acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
            showPreviews={true}
            maxFileSize={5000000}
            onClose={handleClose}
          />
        </div> */}
        {user?.id === blogDetail?.users?.id && <div className="form-group d-flex align-items-center">
          <div className="w-100 d-flex">
            <Button
              className="mr-5"
              size="small"
              color="primary"
              onClick={handleAddEdit}
            >
              {props.match.params.id ? "Edit Blog" : "Add Blog"}
            </Button>
            <Link to="/blogs">
              <Button size="small" color="primary">
                Cancel
              </Button>
            </Link>
          </div>
        </div>}
      </form>
    </div>
  );
}
