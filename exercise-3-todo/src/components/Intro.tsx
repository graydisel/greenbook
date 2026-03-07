export const Intro = ({name, sex}: {name: string, sex: string}) => {

    return (
        <>
            <div style={{padding:'10px'}}>
                <p>Name: {name}</p>
                <p>Sex: {sex}</p>
            </div>
        </>
    )
}