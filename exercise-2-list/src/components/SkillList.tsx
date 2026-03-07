import {skillsData} from "./skills.ts";

function Skill({name, color, level, count}: {name: string, color: string, level: string, count: number}) {
    return (
        <div style={{ backgroundColor: color, borderRadius: 4, color: 'white' }}>
            <p>{name} (<i>{level}</i>) {level === 'advanced' ? `💪 ${count}` : `👍 ${count}`}</p>
        </div>
    )
}

export function SkillList({count} : {count: number}) {
    return (
        <div style={{ border: '1px solid white', padding: '10px' }}>
            {skillsData.map((skill) => (
                <Skill name={skill.name} color={skill.color} level={skill.level} key={skill.name} count={count} />
            ))}
        </div>
    )
}