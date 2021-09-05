import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Blog from "../Blog";
import ReactPopup from "../ReactPopup";
import "./AllBlogs.scss";

import { shallowEqual, useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/action";
let deleteId, user
export default function AllBlogs() {
  const [deletePopup, setDeletePopup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchBlogs())
    user = JSON.parse(localStorage.getItem("user"))
  }, [])
  const { blogs } = useSelector(
    (state) => ({
      blogs: state.blogs,
    }),
    shallowEqual
  );
  const handleDelete = () => {
    dispatch(actions.deleteBlog(deleteId)).then(res => {
      if(res) dispatch(actions.fetchBlogs())
    })
    setDeletePopup(false);
  };
console.log(blogs);
  return (
    <>
      <div className="blog-container d-flex  justify-content-around align-items-center">
        {blogs && blogs.map((obj) => (
          <Link key={Math.random() * 100} to={`/blogs/${obj.id}/details`}>
            <Blog
              blogData={obj}
              user={user}
              onDelete={(e) => {
                e.preventDefault();
                setDeletePopup(true);
                deleteId = obj.id
              }}
            />
          </Link>
        ))}
        {
          blogs && blogs.length === 0 && <h6 className="no">No records Fond</h6>
        }
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
