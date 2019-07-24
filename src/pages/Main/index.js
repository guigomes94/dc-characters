import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './styles-main.css';


export default class Main extends Component {
    state = {
        characters: [].sort((a, b) => a.name - b.name),
    };
    
    componentDidMount() {
        this.loadCharacters();
    };

    loadCharacters = async() => {
        const response = await api.get('/characters');

        this.setState({ characters: response.data.docs });

    };

    sortedByName = (obj) => {
        return obj.sort((a, b) => a.name > b.name);
    }

    filterSkill = (obj) => {
        let tags = [];
        for (let i = 0; i < obj.length; i++) {
            for (let skill of obj[i].skills) {
                if (!tags.includes(skill)) {
                    tags.push(skill);
                }
            }
        } return tags.sort();
    }

    filterAlign = (obj) => {
        let tags = [];
        for (let i = 0; i < obj.length; i++) {
            if (!tags.includes(obj[i].alignment)) {
                tags.push(obj[i].alignment)
            }
        } return tags.sort();
    }

    filterGender = (obj) => {
        let tags = [];
        for (let i = 0; i < obj.length; i++) {
            if (!tags.includes(obj[i].gender)) {
                tags.push(obj[i].gender)
            }
        } return tags.sort();
    }

    capitalize = (arr) => {
        let newArray = [];
        for (let l of arr) {
            let first = l[0].toUpperCase();
            let rest = l.substr(1).toLowerCase();
            newArray.push(first + rest);
        }
        return newArray;
    };

    styleName = (text) => {
        let arr;
        let res;
        if (!text.includes('-')) {
            arr = text.split(' ');
            res = this.capitalize(arr);
            return res.join(' ');
        } else {
            arr = text.split('-');
            res = this.capitalize(arr);
            return res.join('-');
        }
    };

    checkName = (realname, name) => {
        if (realname === name || realname === 'Unknown') {
            return '';
        } else {
            return realname;
        }
    };

    checkValue = (value) => {
        let res = 'undef.'
        if (value === 0) {
            return res;
        }
        return value;
    };


    render() {
        const { characters } = this.state;

        return (
            <div className="character-list">
                <div className="search-bar">
                    <label>
                        Search: <input type="text" name="search" onChange={this.handleChange} placeholder="Type here..."/>   
                    </label>
                </div>
                <div className="filter-sorted-menu">
                    <h2>SORTED</h2>
                    <select name="sorted" id="sorted">
                        <option value="name">Name</option>
                        <option value="height">Height</option>
                        <option value="weight">Weight</option>
                        <option value="first_appeared">First Appeared</option>
                    </select>
                    <div className="skill-filter">
                        <h2>Skills</h2>
                        {this.filterSkill(characters).map( tag =>
                        (<label key={tag}><input type="checkbox" id={`${tag}`}/> {tag}</label>))}
                    </div>
                    <div className="alignment-filter">
                        <h2>Alignment</h2>
                        {this.filterAlign(characters).map( tag =>
                        (<label key={tag}><input type="checkbox" id={`${tag}`}/> {this.styleName(tag)}</label>))}
                    </div>
                    <div className="gender-filter">
                        <h2>Gender</h2>
                        {this.filterGender(characters).map( tag =>
                        (<label key={tag}><input type="checkbox" id={`${tag}`}/> {this.styleName(tag)}</label>))}
                    </div>
                </div>
                <div className="character-card">
                {characters.map( character => (
                    <article key={character._id}>
                        <img alt="character" src={ require(`../../img/characters/${character.name}.jpg`) }/>
                        <strong>{this.styleName(character.name)}</strong>
                        <h2>{this.checkName(this.styleName(character.real_name), this.styleName(character.name))}</h2>
                        <p>{this.checkValue(character.height)} cm, {this.checkValue(character.weight)} kg</p>
                        <Link to={`/character/${character._id}`}>More...</Link>
                    </article>))}
                </div>
            </div>
        );
    };
};
