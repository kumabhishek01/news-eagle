import React, {  useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=> {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResutls] = useState(0);
    
        
    

    const updateNews= async () => {
        props.setProgress(30);
        const url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(60);
        let parsedData = await data.json(data);
        setArticles(parsedData.articles);
        setTotalResutls(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(()=>{
        document.title = `${(props.category).charAt(0).toUpperCase()+(props.category).slice(1)} - NewsEagle`
        updateNews();
        //eslint-disable-next-line
    },[])
   

    // const handlePrevClick = async()=>{
    //     setPage(page-1)
    //     updateNews();
    // }

    // const handleNextClick = async()=>{
    //     setPage(page+1)
    //     updateNews();
        
    // }

    const fetchMoreData = async() => {
        const url=`https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json(data);
        setArticles(articles.concat(parsedData.articles));
        setTotalResutls(parsedData.totalResults);
        console.log(articles)
    };

    return (
      <div className='container my-3'>
        <h1 className='text-center'>Top headlines | {(props.category).charAt(0).toUpperCase()+(props.category).slice(1)}</h1>
        {loading && <Spinner/>}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
            <div className='row mx-2 my-3'>
                {
                    !loading && articles.map((element)=>{
                        return <div className='col-lg-4 col-md-6' key={element.url}>
                                    <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} 
                                    author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                    })
                }
            </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
            <button type='button' disabled={this.state.page<=1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type='button' className='btn btn-dark' disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
       
      </div>
    )
  

}

News.propTypes={
    category: PropTypes.string,
    pageSize: PropTypes.number
}

export default News
