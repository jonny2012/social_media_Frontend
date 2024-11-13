import { Card, CardHeader,Button, CardMedia, CardContent, Typography, Avatar, IconButton, Box, TextField } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useCreatePostCommentsMutation } from './redux/RTKqueries/postQueries';
import { useUpdateUserFollowersMutation} from './redux/RTKqueries/userQueries';
import { Link } from 'react-router-dom';


const Post = ({postId, user, imageUrl,  likes, comments, isFollow }:any) => {
console.log(user)

  const [comment, setComment] = useState('');
  const userId = localStorage.getItem("userId")
  const sendData = {userId, comment}

  const [createComment, {data:commentData, error:commentError, isLoading:commentIsLoading}]= useCreatePostCommentsMutation()
 const [follow, {data, error, isLoading}]= useUpdateUserFollowersMutation()
  const handleCommentChange = (e:ChangeEvent<HTMLInputElement>) => setComment(e.target.value);

  const handleCommentSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 createComment({userId, postId, comment})
    setComment(''); 
  };

  const checkFollow =()=>{
    let followValue:string = ""
    if(user.follows.includes(userId)){
      followValue ="Unfollow"
    }
    else{
      followValue = "Follow"
    }
    return followValue
  }


return (
    <Card sx={{ maxWidth: "100%", mx: 'auto', my: 2 }}>
 
      <Box>
    <CardHeader
      avatar={<Link to={`/user/${user._id}`}><Avatar src={`http://localhost:5000/avatar/${user.profileImage}`} alt={user.fullName} /></Link>}
      title={user.fullName}
      action={<Button onClick={()=>{
        console.log(data)
       return follow({ folowerId:user?._id})}} variant='contained'>{isFollow ? data.message ||checkFollow(): data.message}</Button>}
    >
   </CardHeader>
    <CardMedia
      component="img"
      height="100%"
      
      image={`http://localhost:5000/posts/${imageUrl}`}
      alt="Post image"
    />
    
    </Box>

    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton><FavoriteBorderIcon /></IconButton>
        <IconButton><ChatBubbleOutlineIcon /></IconButton>
        <IconButton><ShareIcon /></IconButton>
      </Box>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        <strong>{likes.length}</strong> likes
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
        <strong>{user.fullName}</strong>
      </Typography>
      <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
        View all {comments.length} comments
      </Typography>
      <CardContent sx={{ borderTop: '1px solid #eee', pt: 1 }}>
        <form onSubmit={handleCommentSubmit}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              fullWidth
              variant="standard"
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
              sx={{ mr: 1 }}
            />
            <Button type="submit" color="primary" disabled={!comment}>
              Post
            </Button>
          </Box>
        </form>
      </CardContent>
    </CardContent>
  </Card>
  
)}
export default Post;