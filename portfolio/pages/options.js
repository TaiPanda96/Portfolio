import OptionsContainer from "../components/OptionsContainer";

// Endpoints
import getoptions from "./endpoints/getoptions";
import getstory from "./endpoints/getstory";


const Options = ({ posts, stories }) => {
    return ( <> <OptionsContainer posts={posts} stories={stories}/></>);
};


export async function getStaticProps() {
    const optionsPromise = getoptions('AAPL');
    const storiesPromise = getstory();

    return Promise.all([optionsPromise, storiesPromise]).then(async (values) => {
        let [ optionsRes, storiesRes ] = values;
        return {
            props: { posts: optionsRes,stories: storiesRes },
        }
    });
}

export default Options;