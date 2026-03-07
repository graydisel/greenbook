export function Intro({name, sex}: {name: string, sex: string}) {
    return (
        <>
            <div>
                <p>Name: {name}</p>
                <p>Sex: {sex}</p>
            </div>
        </>
    )
}