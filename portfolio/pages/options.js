import OptionsContainer from "../components/OptionsContainer";

const Options = ({ posts, stories }) => {
    return ( <> <OptionsContainer posts={posts} stories={stories}/></>);
};


export async function getStaticProps() {
    const optionsRes     = fetch(`http://localhost:8000/api/options/get-options?symbol=AAPL`);
    const storiesRes     = fetch(`http://localhost:8000/api/story/get-story`);

    return Promise.all([optionsRes, storiesRes]).then(async (values) => {
        let [ optionsRes, storiesRes ] = values;
        const posts   = await optionsRes.json();
        const stories = await storiesRes.json();
        return {
            props: { posts,stories },
        }
    });
}

export default Options;