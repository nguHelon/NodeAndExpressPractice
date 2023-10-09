import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from "react-file-base64"

import { useAddNewPostMutation, useUpdatePostMutation, useGetPostsQuery } from '../../reducers/apiSlice';

import useStyles from './styles';


const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const { data } = useGetPostsQuery();
    const currentPost = currentId ? data.find((post) => post._id === currentId) : null;
    const [addNewPost, { isLoading }] = useAddNewPostMutation();
    const [updatePost] = useUpdatePostMutation();
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    useEffect(() => {
        if (currentPost) {
            setPostData(currentPost);
        }
    }, [currentPost])

    const canSave = [postData.creator, postData.title, postData.message, postData.tags, postData.selectedFile].every(Boolean) && !isLoading;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId) {
            try {
                await updatePost({
                    id: currentId,
                    post: postData
                }).unwrap();
            } catch (error) {
                console.error(error);
            }
            clear();
        } else {
            if (canSave) {
                try {
                    await addNewPost({
                        creator: postData.creator,
                        title: postData.title,
                        message: postData.message,
                        tags: postData.tags,
                        selectedFile: postData.selectedFile
                    })
                } catch (err) {
                    console.error('Failed to save the post', err);
                }
            } else {
                console.log("please fill in everything!!")
            }
            clear();
        }
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            creator: '',
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }


    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.form} ${classes.root}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => { setPostData({ ...postData, creator: e.target.value }) }} />
                <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => { setPostData({ ...postData, title: e.target.value }) }} />
                <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e) => { setPostData({ ...postData, message: e.target.value }) }} />
                <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e) => { setPostData({ ...postData, tags: e.target.value }) }} />
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form