import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { openSnackbar } from "../Store/actions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteBlog, editBlog } from "../Store/blogs.action";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RestoreIcon from "@mui/icons-material/Restore";
import PublishIcon from "@mui/icons-material/Publish";
import { CircularProgress } from "@mui/material";
/* eslint-disable react/prop-types */
export default function BlogWithActions({ blog, token }) {
  /*__________States and hooks */
  const dispatch = useDispatch();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isConfirmEditDialogOpen, setConfirmEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState(blog);
  /*___________Pure functions____________ */
  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);
  const openEditDialog = () => setEditDialogOpen(true);
  const closeEditDialog = () => setEditDialogOpen(false);
  const openConfirmEditDialog = (event) => {
    event.preventDefault();
    setConfirmEditDialogOpen(true);
  };
  const closeConfirmEditDialog = () => setConfirmEditDialogOpen(false);

  function formatDateTime(inputDate) {
    const date = new Date(inputDate);

    const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true };
    const timeString = date.toLocaleString("en-US", optionsTime);

    const optionsDate = { day: "2-digit", month: "long", year: "numeric" };
    const dateString = date.toLocaleString("en-US", optionsDate);

    return [timeString, dateString];
  }
  function validateTag(str) {
    if (!str) return true;
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(str);
  }
  const handleTagUpdate = (index, value) => {
    if (!validateTag(value)) return;

    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.map((tag, i) => (index === i ? value : tag)),
    }));
  };
  const handleTagRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };
  const handleAddTag = () => {
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
  };
  /*___________async function__________ */
  async function confirmDeleteBlog() {
    setIsSubmitting(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}/blog/${blog._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(openSnackbar(response.data.message, "success"));
      closeDeleteDialog();
      dispatch(deleteBlog(blog._id));
    } catch (error) {
      console.log(error);
      dispatch(
        openSnackbar(error.response?.data.message || error.message, "error")
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  async function handleUpdateBlog(event) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        `${BACKEND_URL}/blog/${blog._id.toString()}`,formData,{headers:{Authorization:`Bearer ${token}`}}
      );
      closeConfirmEditDialog();
      closeEditDialog();
      dispatch(editBlog(response.data.data));
      dispatch(openSnackbar(response.data.message, "success"));
    } catch (error) {
      closeConfirmEditDialog();
      dispatch(
        openSnackbar(error.response?.data.message || error.message, "error")
      );
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex flex-col sm:flex-row justify-between mr-1 gap-2 p-2 border border-slate-300 rounded-md">
      <div className="flex flex-col gap-2">
        <h4 className="text-xl font-medium">Blog title : {blog.title}</h4>
        <div className="flex text-xs">
          <p>Published on : </p>
          <p>{formatDateTime(blog.createdAt)[0]}</p>
          <p>{formatDateTime(blog.createdAt)[1]}</p>
        </div>
        <div className="flex text-xs">
          <p>Last Interaction : </p>
          <p>{formatDateTime(blog.updatedAt)[0]}</p>
          <p>{formatDateTime(blog.updatedAt)[1]}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between  h-2/4 ">
          <button onClick={openEditDialog}>
            <EditNoteIcon fontSize="large" />
          </button>
          <button onClick={openDeleteDialog}>
            <DeleteIcon fontSize="large" />
          </button>
        </div>

        <div className="flex gap-2 h-2/4">
          <div className="flex  items-center gap-1">
            <ThumbUpIcon className="-scale-x-100" />
            <p>{blog.likes.length}</p>
          </div>
          <div className="flex  items-center gap-1">
            <CommentIcon className="-scale-x-100" />
            <p>{blog.comments.length}</p>
          </div>
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onClose={closeDeleteDialog}>
        <div className="w-screen max-w-lg p-4 rounded-md shadow-lg bg-white flex flex-col gap-4">
          <div className="flex justify-between gap-6">
            <div className="text-2xl font-medium ">
              <h4>Are you sure want to delete this blog ?</h4>
              <p className="text-sm text-red-500">
                * This action cannot be undone.
              </p>
            </div>
            <button disabled={isSubmitting} onClick={closeDeleteDialog}>
              <CloseIcon fontSize="large" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-lg font-medium">
              <b>Blog title :</b> {blog.title}
            </p>
            <p className="line-clamp-2">
              <b>Blog Content :</b> {blog.content}
            </p>
          </div>

          <div className="flex justify-end gap-2 font-medium">
            <button
              onClick={closeDeleteDialog}
              disabled={isSubmitting}
              className="flex items-center gap-1 bg-yellow-400 text-white rounded-md p-1 px-3 disabled:opacity-50  "
            >
              <p>Cancel</p>
              <CloseIcon />
            </button>
            <button
              onClick={confirmDeleteBlog}
              disabled={isSubmitting}
              className="flex items-center gap-1 bg-red-500 text-white rounded-md p-1 px-3 disabled:opacity-50   "
            >
              {isSubmitting ? (
                <CircularProgress color="" />
              ) : (
                <>
                  {" "}
                  <p>Delete</p>
                  <DeleteIcon />
                </>
              )}
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog open={isEditDialogOpen} onClose={closeEditDialog}>
        <div className="w-screen max-w-lg p-4 rounded-md shadow-lg bg-white flex flex-col gap-4">
          <div className="flex justify-between gap-6">
            <h4 className="text-2xl font-medium ">Edit Blog</h4>
            <button disabled={isSubmitting} onClick={closeEditDialog}>
              <CloseIcon fontSize="large" />
            </button>
          </div>
          <form
            onSubmit={openConfirmEditDialog}
            className="p-2 flex flex-col gap-3"
          >
            <div className="flex flex-col gap-2">
              <p>Blog Title *</p>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter blog title"
                className="border border-slate-400 p-2 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p>Blog Content *</p>
              <textarea
                type="text"
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Enter blog content"
                className="border border-slate-400 p-2 min-h-32 rounded-md"
              />
            </div>
            {/* <div className="flex flex-col gap-2">
            <p>Related Image (.jpg, .png, .webp, .jfif, .jpeg only)</p>
            <input
              type="file"
              accept=".jpg, .png, .webp, .jfif, .jpeg"
              className="border border-slate-400 p-2 rounded-md"
            />
          </div> */}
            <div className="flex flex-col gap-2">
              <p>Add related tags</p>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="relative flex items-center gap-px border border-slate-400 p-1 rounded-md"
                  >
                    <p className="">#</p>
                    <input
                      type="text"
                      required
                      value={tag}
                      onChange={(e) => handleTagUpdate(index, e.target.value)}
                      minLength={2}
                      placeholder="tag"
                      className="w-full outline-0"
                    />
                    {formData.tags.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleTagRemove(index)}
                        className="absolute right-1 top-1"
                      >
                        <CancelOutlinedIcon fontSize="small" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddTag}
                className="w-fit bg-blue-400 text-white rounded-full py-1 px-2"
              >
                Add more tags
              </button>
            </div>
            {formData !== blog && (
              <button
                type="button"
                disabled={formData === blog || isSubmitting}
                onClick={() => setFormData(blog)}
                className="edit-form-button flex justify-center gap-1 bg-yellow-400 text-white rounded-full py-2"
              >
                <p>Reset</p>

                <RestoreIcon />
              </button>
            )}
            <button
              type="submit"
              disabled={formData === blog || isSubmitting}
              className="edit-form-button flex justify-center gap-1 bg-primary text-white rounded-full py-2"
            >
              <p>Update Blog</p>
              <PublishIcon />
            </button>
          </form>

          <Dialog
            open={isConfirmEditDialogOpen}
            onClose={closeConfirmEditDialog}
          >
            <div className="w-screen max-w-[350px] p-4 rounded-md shadow-lg bg-white flex flex-col gap-4">
              <div className="flex justify-between gap-2">
                <h2 className="text-3xl font-medium">Confrim Update ?</h2>
                <button type="button" onClick={closeConfirmEditDialog}>
                  <CloseIcon fontSize="large" />
                </button>
              </div>
              <div className="flex flex-col items-center gap-4 text-xl">
                <button
                  type="submit"
                  onClick={handleUpdateBlog}
                  disabled={formData === blog || isSubmitting}
                  className="w-full flex justify-center gap-1 bg-primary text-white rounded-full py-1 px-2"
                >
                  {isSubmitting ? (
                    <CircularProgress color="" />
                  ) : (
                    <>
                      <p>Confirm Update</p>
                      <PublishIcon />
                    </>
                  )}
                </button>

                <button
                  onClick={closeConfirmEditDialog}
                  className="w-full flex justify-center gap-1 bg-yellow-400 text-white rounded-full py-1 px-2"
                >
                  <p>Update More</p>
                  <EditNoteIcon />
                </button>
              </div>
            </div>
          </Dialog>
        </div>
      </Dialog>
    </div>
  );
}
