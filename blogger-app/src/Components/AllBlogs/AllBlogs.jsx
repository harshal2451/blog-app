import React, { useState } from "react";
import { Link } from "react-router-dom";
import Blog from "../Blog";
import ReactPopup from "../ReactPopup";
import "./AllBlogs.scss";

export default function AllBlogs() {
  const [deletePopup, setDeletePopup] = useState(false);

  const handleDelete = () => {
    setDeletePopup(false);
  };

  return (
    <>
      <div className="blog-container d-flex  justify-content-between align-items-center">
        {[1, 2, 3].map((obj) => (
          <Link key={Math.random() * 100} to={`/${obj.id}/details`}>
            <Blog
              onDelete={(e) => {
                e.preventDefault();
                setDeletePopup(true);
              }}
            />
          </Link>
        ))}
      </div>
      <ReactPopup
        open={deletePopup}
        iconDivClass="warning-delete-div"
        iconName="fa fa-exclamation"
        modelHeaderText="Are You sure to Delete this Blog?"
        modelText="Delete Blog"
        modelBtnName="Delete"
        modalPositiveBtn="react-model-btn-delete"
        onDelete={handleDelete}
        onCancel={() => setDeletePopup(false)}
      />
    </>
  );
}
