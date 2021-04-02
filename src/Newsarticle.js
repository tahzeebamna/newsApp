import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Paper,TableContainer,Table,TableBody,TableHead,TableCell,TableRow,Container, TablePagination} from "@material-ui/core"


function Newsarticle() {
    const [item, setItem] =useState([]);
    const [page, setPage] =useState(0);

    const [rowsPerPage, setRowsPerPage] =useState(5);

    useEffect(()=>{
        const getArticles = async () =>{
        const resp = await axios.get("https://newsapi.org/v2/top-headlines?country=in&apiKey=ab9c37abbbb84bb88c56fb1eb3cfc2e7")
        
        console.log(resp);
        setItem(resp.data.articles)

        
        
        
        };

        getArticles();

    }, [])

    const onChangePage = (e, nextPage)=>{
        setPage(nextPage)

    }
    return (
        <Container>
            
            <TableContainer component ={Paper}>
            <Table>
            <TableHead>
                
              <TableRow >
                  <TableCell>Image</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Url</TableCell>


                  
                </TableRow>
          </TableHead>
            <TableBody>
            {item.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage).map((articles)=>(
                
                <TableRow> 
                <TableCell className="title"> <img className="img" src={articles.urlToImage}></img></TableCell>
                <TableCell className="description">{articles.source.name}</TableCell>
                <TableCell className="content">{articles.author}</TableCell>
                <TableCell  >{articles.title} </TableCell>
                <TableCell  >{articles.publishedAt} </TableCell>
                <TableCell  >{articles.url} </TableCell>

                
            </TableRow>
                
        ))}
            </TableBody>
        </Table>
        <TablePagination 
                rowsPerPageOptions={[10,15,20]}
                count={item.length}
                rowsPerPAge = {rowsPerPage}
                page={page}
                onChangePage={onChangePage}
       />
      </TableContainer>
       

      </Container>
   

    )
}

export default Newsarticle
