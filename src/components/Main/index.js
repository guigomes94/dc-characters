import React, { useState,  useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';


export default function Main() {
    const [data, setData] = useState([])
    const [characters, setCharacters] = useState([])
    useEffect(() => {
        axios
            .get('https://dc-characters-api.herokuapp.com/characters')
            .then(res => {
                setData(res.data.docs)
                setCharacters(res.data.docs)
            })}, [])
    
    const filterSkill = (obj) => {
        let tags = [];
        for (let i = 0; i < obj.length; i++) {
            for (let skill of obj[i].skills) {
                if (!tags.includes(skill)) {
                    tags.push(skill);}}
                } return tags.sort();
            }
        
    const filterAlign = (obj) => {
        let tags = [];
        for (let i = 0; i < obj.length; i++) {
            if (!tags.includes(obj[i].alignment)) {
                tags.push(obj[i].alignment)}
            } return tags.sort();
    }
        
    const filterGender = (obj) => {
        let tags = [];
        for (let i = 0; i < obj.length; i++) {
            if (!tags.includes(obj[i].gender)) {
                tags.push(obj[i].gender)}
            } return tags.sort();
    }
        
    const capitalize = (arr) => {
        let newArray = [];
        for (let l of arr) {
            let first = l[0].toUpperCase();
            let rest = l.substr(1).toLowerCase();
            newArray.push(first + rest);
        } return newArray;
    }
        
    const styleName = (text) => {
        let arr;
        let res;
        if (!text.includes('-')) {
            arr = text.split(' ');
            res = capitalize(arr);
            return res.join(' ');
        } else {
            arr = text.split('-');
            res = capitalize(arr);
            return res.join('-');
        }
    }

    const teste = () => {
        setCharacters([data[6]])
    }

    const home = () => {
        setCharacters(data)
    }

    const filterBySkill = (tag) => {
        let newlist = []
        for (let character of characters) {
            for (let skill of character.skills) {
                if (skill === tag) {
                    newlist.push(character)
                }
            }
        }
        setCharacters(newlist)
    }

    const filterByAlign = (tag) => {
        let newlist = []
        newlist = characters.filter(obj => obj.alignment === tag)
        setCharacters(newlist)
    }

    const filterByGender = (tag) => {
        let newlist = []
        newlist = characters.filter(obj => obj.gender === tag)
        setCharacters(newlist)
    }
        
    return (
        <div className="character-list">
            <div className="search-bar">
                <h1 onClick={ home }>Home</h1>
                <label>
                    Search: <input type="text" name="search" placeholder="Type here..."/>   
                </label>
                <button>GO</button>
            </div>
            <div className="filter-sorted-menu">
                <div className="orderby">
                    <h2>Order By</h2>
                    <button>Name</button>
                    <button onClick={ teste }>Height</button>
                    <button>Weight</button>
                    <button>Creation Year</button>
                </div>
                <div className="skill-filter">
                    <h2>Skills</h2>
                    {filterSkill(data).map( tag =>
                        (<label key={tag}><input type="checkbox" onChange={ evt => filterBySkill(evt.target.id) } id={`${tag}`}/> {tag}</label>))}
                </div>
                <div className="alignment-filter">
                    <h2>Alignment</h2>
                    {filterAlign(data).map( tag =>
                        (<label key={tag}><input type="checkbox" onChange={ evt => filterByAlign(evt.target.id) } id={`${tag}`}/> {styleName(tag)}</label>))}
                </div>
                <div className="gender-filter">
                    <h2>Gender</h2>
                    {filterGender(data).map( tag =>
                        (<label key={tag}><input type="checkbox" onChange={ evt => filterByGender(evt.target.id) } id={`${tag}`}/> {styleName(tag)}</label>))}
                </div>
            </div>
            <div className="character-card">
            {characters.map(character => 
                (<article key={character._id}>
                    <img alt="character" src={ require(`../../img/characters/${character.name}.jpg`) }/>
                    <strong>{styleName(character.name)}</strong>
                    <Link to={`/character/${character._id}`}>More Info</Link>
                </article>))}
            </div>
        </div>)
}

