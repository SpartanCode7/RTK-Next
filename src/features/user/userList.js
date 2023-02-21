"use client"

import React, { useState } from 'react'
import {
  useGetPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from '../api/userApiSlice'
function User() {
  const [addNewPost, response] = useAddNewPostMutation()
  const [deletePost] = useDeletePostMutation()
  //Set All Fields
  const [inputField, setInputField] = useState({
    user: '',
    title: '',
    short_description: '',
    detailed_description: '',
    category: '',
    target_industry: '',
    landing_page: '',
    role: '',
    patch_video: '',
    logo_image: '',
    app_image: '',
    presentation_slides: '',
  })
  //Handler to handle input fields //will impact on onChange
  const inputsHandler = (e) => {
    setInputField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  //Update 
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation()
  const setPostData = (data) => {
    setInputField({
      id: data.id,
      name: data.name,
      description: data.description,
    })
  }
  
  //Edit Data
  const onEditData = () => {
    updatePost({
      id: inputField.id,
      name: inputField.name,
      description: inputField.description,
    })
    setInputField(() => ({
      id: '',
      name: '',
      description: '',
    }))
  }

  //Submit Data
  const onSubmit = (e) => {
    e.preventDefault()
    const { title, short_description, detailed_description, category, target_industry, landing_page, role, patch_video, logo_image, app_image, presentation_slides } = e.target.elements
    setInputField((inputField) => ({
      ...inputField,
      [e.target.title]: e.target.title,
      [e.target.short_description]: e.target.short_description,
      [e.target.detailed_description]: e.target.detailed_description,
      [e.target.category]: e.target.category,
      [e.target.target_industry]: e.target.target_industry,
      [e.target.landing_page]: e.target.landing_page,
      [e.target.role]: e.target.role,
      [e.target.patch_video]: e.target.patch_video,
      [e.target.logo_image]: e.target.logo_image,
      [e.target.app_image]: e.target.app_image,
      [e.target.presentation_slides]: e.target.presentation_slides,
    }))
    let formData = {
      title: title.value,
      short_description: short_description.value,
      detailed_description: detailed_description.value,
      category: category.value,
      target_industry: target_industry.value,
      landing_page: landing_page.value,
      role: role.value,
      patch_video: patch_video.value,
      logo_image: logo_image.value,
      app_image: app_image.value,
      presentation_slides: presentation_slides.value,
    }
    //Add new
    addNewPost(formData)
      .unwrap()
      .then(() => {
        setInputField(() => ({
          user: '',
          title: '',
          short_description: '',
          detailed_description: '',
          category: '',
          target_industry: '',
          landing_page: '',
          role: '',
          patch_video: '',
          logo_image: '',
          app_image: '',
          presentation_slides: '',
        }))
      })
      .then((error) => {
        console.log(error)
      })
  }
  //Get Data
  const {
    data: posts,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError,
  } = useGetPostsQuery({ refetchOnMountOrArgChange: true })
  let postContent
  if (isGetLoading) {
    postContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  } else if (isGetSuccess) {
    postContent = posts.map((item) => {
      return (
        <div className="col-lg-12 mb-3" key={item.id}>
          <div className="card alert alert-secondary">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.description}</p>
              <button
                onClick={() => deletePost(item.id)}
                className="btn btn-outline-danger me-2"
              >
                Remove
              </button>
              <button
                onClick={() => setPostData(item)}
                className="btn btn-outline-primary"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )
    })
  } else if (isGetError) {
    postContent = (
      <div className="alert alert-danger" role="alert">
        {getError}
      </div>
    )
  }
  return (
    <div className="row">
      <div className="col-md-4 offset-md-*">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.title}
              type="text"
              className="form-control"
              name="title"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.short_description}
              type="text"
              className="form-control"
              name="short_description"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.detailed_description}
              type="text"
              className="form-control"
              name="detailed_description"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.category}
              type="text"
              className="form-control"
              name="category"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.target_industry}
              type="text"
              className="form-control"
              name="target_industry"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.landing_page}
              type="text"
              className="form-control"
              name="landing_page"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.role}
              type="text"
              className="form-control"
              name="role"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.patch_video}
              type="text"
              className="form-control"
              name="patch_video"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.logo_image}
              type="text"
              className="form-control"
              name="logo_image"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.app_image}
              type="text"
              className="form-control"
              name="app_image"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.presentation_slides}
              type="text"
              className="form-control"
              name="presentation_slides"
              id="title"
              onChange={inputsHandler}
            />
          </div>
          <button className="btn btn-danger me-2" type="submit">
            Submit
          </button>
          <button
            onClick={onEditData}
            className="btn btn-primary"
            type="button"
          >
            Update
          </button>
        </form>
      </div>
      <div className="col-lg-8">
        <div className="row">{postContent}</div>
      </div>
    </div>
  )
}
export default User