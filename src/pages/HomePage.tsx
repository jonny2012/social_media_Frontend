import { Box, Grid2 } from "@mui/material"
import { useGetAllPostsQuery } from "../redux/RTKqueries/postQueries";
import Post from "../Post";


export const HomePage = ()=>{

    const { data:postData, error, isLoading } = useGetAllPostsQuery("");
console.log(postData)
    return (
        <Box sx={{display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:"30px",
            padding:"60px"
        }}>
        {postData && postData.map((post:any, index:number) => (
          <Box key={index} sx={{width:"400px"}}>
            <Post postId={post._doc._id} user={post._doc["userId"]} imageUrl={post._doc.image}  likes={post._doc.likes} isFollow={post._doc.isFollow} comments={post._doc.comments} />
       
          </Box>
        ))}
      </Box>
    )
}