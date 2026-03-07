import {Link} from "react-router-dom";

export const Home = () => {
    return (
        <div style={{padding:'10px'}}>
            <h1>Welcome Home</h1>
            <div>
                <Link to={'/user'}>About User</Link>
            </div>
            <div>
                <Link to={'/todolist'}>To Do List</Link>
            </div>
        </div>
    )
}