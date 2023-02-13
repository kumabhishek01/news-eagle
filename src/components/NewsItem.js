import React from 'react'
import nullImageReplace from '../img/news.jpg'

const NewsItem =(props)=> {

    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div>
        <div className="card my-3">
            <img src={!imageUrl?nullImageReplace:imageUrl} className="card-img-top" alt="/" style={{height:'25vh'}}/>
            <div className="card-body" style={{height:'35vh'}}>
                <h5 className="card-title">{title.slice(0,60)}...</h5>
                <p className="card-text" id='newsDescription'>{description}</p>
                <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-dark">Read More</a>
            </div>
            <div className="card-footer">
                  <small className="text-muted">By {author?author:'Unknown'} on {new Date(date).toGMTString()}</small><br/>
                  <small className="text-muted">Source : {source}</small>
            </div>
        </div>
      </div>
    )
  
}
export default NewsItem