export const Intro = ({name, sex, onLike}: {name: string, sex: string, onLike: () => void}) => {

    return (
        <>
            <div style={{padding:'10px'}}>
                <p>Name: {name}</p>
                <p>Sex: {sex}</p>
                <button onClick={onLike}>Like!</button>
            </div>
        </>
    )
}