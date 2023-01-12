
function StoryBox({ stories }) {
    return (
        <div container>
            {stories.map((post) => {
                return (
                    <div key={post.title}>
                        <div class="relative">
                            <label class="font-bold">Title: </label>
                            <input type="text" value={post.title} />
                        </div>
                        <br/>
                        <div class="relative">
                            <label class="font-bold">Project Description: </label>
                        </div>
                        <span>{post.description}
                        </span>
                        <br/>

                        <div class="relative">
                            <label class="font-bold">Duration: </label>
                            <input type="text" value={post.duration} />
                        </div>
                        <br/>
                        <div class="relative">
                            <label class="font-bold">Architecture Used: </label>
                            {post.skills.map((skill) => {
                                return (
                                    <div class="relative">
                                        <ul>
                                            <li>-{skill}</li>
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default StoryBox