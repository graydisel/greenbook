import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}


export const ToDoList = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [data, setData] = useState<Todo[]>([])
    useEffect(() => {
            const fetchData = async () => {
                setStatus('loading');
                try {
                    const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
                    if (!response.ok) throw new Error("Error fetching data");
                    const resData = await response.json();
                    setData(resData);
                    setStatus('success');
                } catch (error) {
                    console.log(error);
                    setStatus('error');
                }
            };
            fetchData();
        }, []
    );
    
    return (
        <>
            <Link to={'/'}>Back</Link>
            {status === 'loading' && <div>Loading...</div>}
            {status === 'error' && <div style={{color: 'red'}}>Error fetching data</div>}
            {status === 'success' && (
                <div>
                <p>Success!</p>
                    <ul>
                        {data.map(todo => (
                            <li key={todo.id}>
                                <p>{todo.title}</p>
                                <p>Completed: {todo.completed ? "Yes" : "No"}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}