import React, { useState, useEffect } from 'react'
import { Grid, CircularProgress } from "@material-ui/core"
import Post from './Post/Post'
import useStyles from './styles';
import { useGetPostsQuery } from '../../reducers/apiSlice'

const Posts = ({ currentId, setCurrentId }) => {
    const { data, isFetching } = useGetPostsQuery();
    const [posts, setPosts] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        if (isFetching === false) setPosts(data)
    }, [isFetching, data])

    console.log(posts, data);

    return (
        isFetching ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => {
                        return <Grid key={post._id} item xs={12} sm={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    })
                }
            </Grid>
        )
    )
}

export default Posts;