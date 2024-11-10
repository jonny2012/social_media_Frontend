import { Box, Container, Typography,Grid2, ImageList, ImageListItem } from "@mui/material"
import { useGetAllPostsQuery } from "../../redux/RTKqueries/userQueries";



export const  ExplorePosts = ({isOpenDrawer}:any)=>{
    const { data:postData, error, isLoading } = useGetAllPostsQuery(undefined);
    return (
        
        <Box sx={{ flexGrow: 1, padding: 2 }+ isOpenDrawer?{marginLeft:"600px"}:{marginLeft:"380px",maxWidth:"970px"} }>
        <Grid2 container spacing={2}>
          { postData && postData.map((post:any, index:number) => (
            <Grid2
                           // Each image takes 4 columns on medium screens
              key={index}
              sx={{
                height: 
                  ((index+1) % 3 === 0 && index !==0) ? '400px' : '200px', // Double height for 2nd, 4th, and 9th images
              }}
            >
              <Box
                component="img"
                src={`http://localhost:5000/posts/${post.image}`}       // Image source from backend
                alt={`image-${index}`}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 1,
                }}
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>
  
      
    )
}