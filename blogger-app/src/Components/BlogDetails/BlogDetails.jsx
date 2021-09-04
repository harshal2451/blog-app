import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "./BlogDetails.scss";
import { DropzoneDialog } from "material-ui-dropzone";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

export default function BlogDetails() {
  const [blogDetail, setBlogDetail] = useState({
    title: "",
    imgSrc: "",
    description: "",
  });

  const [openDropzone, setOpenDropzone] = useState(false);

  const handleChange = (e) => {
    setBlogDetail({
      ...blogDetail,
      [e.target.name]: e.target.value,
    });
    setOpenDropzone(false);
  };
  const saveImage = (files) => {
    console.log(files);
  };

  const handleClose = () => {
    setOpenDropzone(false);
  };

  return (
    <div className="d-flex border justify-content-center align-items-center p-5">
      <form>
        <div class="form-group">
          <label for="exampleFormControlInput1">Title</label>
          <input
            type="text"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Description</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={blogDetail.description}
            name="description"
            onChange={handleChange}
          ></textarea>
        </div>
        <div class="form-group">
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
        </div>
        <div class="form-group d-flex align-items-center">
          <div className="w-100 d-flex">
            <Button className="mr-5" size="small" color="primary">
              Edit
            </Button>
            <Link to="/blogs" ><Button size="small" color="primary">
              Cancel
            </Button></Link>
            
          </div>
        </div>
      </form>
    </div>
  );
}
