export default function Blog({ posts }) {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center">
                <div className="w-1/2">
                    <h1 className="text-5xl font-bold">Home</h1>
                    <p className="text-xl">Welcome to my portfolio</p>
                </div>
            </div>
            <ul>
                {posts.map((post) => (
                    <li>{post.title}</li>
                ))}
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('')
    const posts = await res.json()

    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    return {
        props: {
            posts,
        },
    }
}


