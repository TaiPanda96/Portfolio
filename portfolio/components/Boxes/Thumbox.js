function Thumbbox({ posts }) {
    return (
        <div className="row">
            {posts.map((storyPreview) => {
                return (
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <img src={storyPreview.image} className="bd-placeholder-img card-img-bottom" width="100%" height="150" />
                            <div className="card-body">
                                <p className= "card-text"> {storyPreview.title} </p>
                                <p className="card-text">{storyPreview.description}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div>
                                    <small className="text-muted">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function getStaticProps() {
    // Props returned will be passed to the page component
    return {
        props: {
            posts: [
                {
                    title: 'Options Project',
                    image: "https://picsum.photos/200/300",
                    description: "This is a description of the story"
                },
                {
                    title: 'Open AI Project',
                    image: "https://picsum.photos/200/300",
                    description: "This is a description of the story"
                },
                {
                    title: 'News Aggregation Project',
                    image: "https://picsum.photos/200/300",
                    description: "This is a description of the story"
                }
            ]
        }
    }
}


export default function StoryPreview() {
    let posts = getStaticProps()
    return (<Thumbbox posts={posts.props.posts} />)
}