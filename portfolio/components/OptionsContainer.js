import DataTable from './DisplayTable/Table'
import Paper from './Paper/Paper'
import StoryBox from './Boxes/StoryBox'


function OptionsContainer({ posts, stories }) {
    return (
        <div className="flex flex-col items-center">
            <Paper> 
                <h1 className="text-5xl font-bold">Options Project</h1>
                <br/>
                <p className="text font-light">This is a project to display options data for a given stock.</p>
            </Paper>
            <br/>
            <Paper> 
                <StoryBox stories={stories} />
            </Paper>
            <br/>
            <Paper>
                <DataTable data={posts} />
            </Paper>
        </div>
    )
}

export default OptionsContainer
