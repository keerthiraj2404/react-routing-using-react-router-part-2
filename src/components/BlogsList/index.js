import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const jsonData = await response.json()

    const updateData = jsonData.map(eachData => ({
      id: eachData.id,
      imageUrl: eachData.image_url,
      title: eachData.title,
      topic: eachData.topic,
      author: eachData.author,
      avatarUrl: eachData.avatar_url,
    }))

    this.setState({blogsData: updateData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
