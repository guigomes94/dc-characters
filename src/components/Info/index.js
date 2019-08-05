import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.css';

export default function Character({ match }) {
    const [character, setCharacter] = useState('')
    useEffect(() => {
        axios
            .get(`https://dc-characters-api.herokuapp.com/characters/admin/${match.params.id}`)
            .then(res => {
                setCharacter(res.data)
            })}, [match.params.id])

    const capitalize = (arr) => {
        let newArray = [];
        for (let l of arr) {
            let first = l[0].toUpperCase();
            let rest = l.substr(1).toLowerCase();
            newArray.push(first + rest);
        }
        return newArray;
    };

    const styleName = (text) => {
        let name = String(text);
        let arr;
        let res;
        if (!name.includes('-')) {
            arr = name.split(' ');
            res = capitalize(arr);
            return res.join(' ');
        } else {
            arr = name.split('-');
            res = capitalize(arr);
            return res.join('-');
        }
    };

    const checkName = (realname, name) => {
        if (realname === name || realname === 'Unknown') {
            return '';
        } else {
            return realname;
        }
    };

    const checkValue = (value) => {
        let res = 'undefined'
        if (value === 0) {
            return res;
        }
        return value;
    };

    const skills = (arr) => {
        let res = String(arr).split(',')

        return (
            res.map(skill => 
            <div key={skill}>
                <li>{skill}</li>
            </div>)
        )
    }

    return (
        <div className="character-info">
            <div className="info">
                <h1>{styleName(character.name)}</h1>
                <h2>{checkName(styleName(character.real_name), styleName(character.name))}</h2>
                <p>Gender: {styleName(character.gender)}</p>
                <p>Height: {checkValue(character.height)} cm, Weight: {checkValue(character.weight)} kg</p>
                <p>Creation Year: {character.first_appeared}</p>
            </div>
            <div className="skills">
                <h1>Powers and Abilities</h1>
                {skills(character.skills)}
            </div>
            <div className="description">
                <h1>About:</h1>
                <p>{character.description}</p>
            </div>
        </div>)
}
