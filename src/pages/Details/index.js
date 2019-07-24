import React, { Component } from 'react';
import api from '../../services/api';
import './styles-details.css';

export default class Character extends Component {
    state = {
        character: {}
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        const response = await api.get(`/characters/admin/${id}`);
        this.setState({ character: response.data });
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
        let name = String(text);
        let arr;
        let res;
        if (!name.includes('-')) {
            arr = name.split(' ');
            res = this.capitalize(arr);
            return res.join(' ');
        } else {
            arr = name.split('-');
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
        let res = 'undefined'
        if (value === 0) {
            return res;
        }
        return value;
    };

    render() {
        const { character } = this.state;

        return (
            <div className="character-info">
                    <div className="info">
                        <h1>{this.styleName(character.name)}</h1>
                        <h2>{this.checkName(this.styleName(character.real_name), this.styleName(character.name))}</h2>
                        <p>Gender: {this.styleName(character.gender)}</p>
                        <p>Height: {this.checkValue(character.height)} cm, Weight: {this.checkValue(character.weight)} kg</p>
                        <p>Creation's Year: {character.first_appeared}</p>
                        <div className="description">
                            <h1>About:</h1>
                            <p>{character.description}</p>
                        </div>
                    </div>
                    
            </div>
        );
    }
};
