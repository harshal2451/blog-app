import {
  LOGOUT,
  FETCH_REQUEST,
  FETCH_BLOG_SUCCESS,
  FETCH_SUCCESS,
  FETCH_ERROR,
  FETCH_BLOG_DETAIL,
  LOGIN,
} from "./actionType";
import axios from "axios";
const BASE_URL = "http://localhost:3001/api/v1";
export function fetchBlogSuccess(blog) {
  return {
    type: FETCH_BLOG_SUCCESS,
    payload: blog,
  };
}

export function fetchSuccess(blog) {
  return {
    type: FETCH_SUCCESS,
  };
}

export function fetchError(error) {
  return {
    type: FETCH_ERROR,
    payload: error,
  };
}

export function fetchRequest() {
  return {
    type: FETCH_REQUEST,
    payload: null,
  };
}

export function fetchBlogDetail(blogDetail) {
  return {
    type: FETCH_BLOG_DETAIL,
    payload: blogDetail,
  };
}

export function loginDetails(user) {
  return {
    type: LOGIN,
    payload: user,
  };
}

export function register(full_name, email, password) {
  return (dispatch) => {
    dispatch(fetchRequest());
    return axios
      .post(BASE_URL + "/auth/signup", { full_name, email, password })
      .then((res) => {
        if (res) {
          dispatch(fetchSuccess());
        }
        return res;
      })
      .catch((err) => {
        dispatch(fetchError(err.message));
      });
  };
}
export function login(email, password) {
  return (dispatch) => {
    dispatch(fetchRequest());
    return axios
      .post(BASE_URL + "/auth/login", { email, password })
      .then((res) => {
        if (res) {
          dispatch(fetchSuccess());
          dispatch(loginDetails(res.data.response_data));
        }
        return res;
      })
      .catch((err, res) => {
        dispatch(fetchError(err.message));
      });
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function fetchBlogs(email, password) {
  return (dispatch) => {
    dispatch(fetchRequest());
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    axios
      .get(BASE_URL + "/blogs", {
        headers: { Authorization: `token ${token}` },
      }).then(res => {
          if(res){
            dispatch(fetchBlogSuccess(res.data.response_data));
          }
      })
    
  };
}


  export function fetchBlogDetailId(id) {
    return (dispatch) => {
      dispatch(fetchRequest());
      const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
      return axios
        .get(BASE_URL + "/blogs/detail/" + id,
        { headers: { authorization: `token ${token}` } },
        )
        .then((res) => {
          if (res) {
            dispatch(fetchBlogDetail(res.data.response_data));
          }
          return res;
        })
        .catch((err) => {
          dispatch(fetchError(err.message));
        });
    };
  }
export function addBlog(blog_title, blog_description) {
    return (dispatch) => {
      dispatch(fetchRequest());
      const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
      return axios
        .post(BASE_URL + "/blogs",
        { blog_title, blog_description },
        { headers: { authorization: `token ${token}` } },
        )
        .then((res) => {
          if (res) {
            dispatch(fetchSuccess());
          }
          return res;
        })
        .catch((err) => {
          dispatch(fetchError(err.message));
        });
    };
  }

  export function updateBlog(blogId, title, description) {
    return (dispatch) => {
      dispatch(fetchRequest());
      const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
      return axios
        .put(BASE_URL + "/blogs/" + blogId,
        { blog_title: title, blog_description: description },
        { headers: { authorization: `token ${token}` } },
        )
        .then((res) => {
          if (res) {
            dispatch(fetchSuccess());
          }
          return res;
        })
        .catch((err) => {
          dispatch(fetchError(err.message));
        });
    };
  }

  export function deleteBlog(deleteId) {
    return (dispatch) => {
      dispatch(fetchRequest());
      const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
      return axios
        .delete(BASE_URL + "/blogs/"+ deleteId,
        { headers: { authorization: `token ${token}` } },
        )
        .then((res) => {
          if (res) {
            dispatch(fetchSuccess());
          }
          return res;
        })
        .catch((err) => {
          dispatch(fetchError(err.message));
        });
    };
  }
