function Skill({name, color}: {name: string, color: string}) {
    return (
        <div style={{ backgroundColor: color, borderRadius: 4, color: 'white' }}>
            <p>{name}</p>
        </div>
    )
}

export function SkillList() {
    return (
        <div style={{ border: '1px solid white', padding: '10px' }}>
            <Skill name={'HTML'} color={'#C65300FF'}></Skill>
            <Skill name={'CSS'} color={'#1D64CFFF'}></Skill>
            <Skill name={'JavaScript'} color={'#ffac00'}></Skill>
            <Skill name={'React JS'} color={'#00bbff'}></Skill>
        </div>
    )
}