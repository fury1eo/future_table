import React from 'react';
import './Table.css';
import Arrow from '../../images/triangle.png';

const Table = ({ data, infoFunc, sortFunc, statuses }) => {
    let k = 0;

    return (
        <table className='table'>
            <tr>
                <th 
                    onClick={() => sortFunc('id')} 
                    style={{borderRight: '1px solid #bababa', textAlign: 'center'}}>
                        Id  
                        <img 
                            style={statuses.id === 1 ? {transform: 'rotate(180deg)'} : {}} 
                            src={Arrow} alt='arrow'>
                        </img>
                </th>
                <th 
                    onClick={() => sortFunc('firstName')}>
                        First name  
                        <img 
                            style={statuses.firstName === 1 ? {transform: 'rotate(180deg)'} : {}} 
                            src={Arrow} alt='arrow'>
                        </img>
                </th>
                <th 
                    onClick={() => sortFunc('lastName')}>
                        Last name  
                        <img 
                            style={statuses.lastName === 1 ? {transform: 'rotate(180deg)'} : {}} 
                            src={Arrow} alt='arrow'>
                        </img>
                </th>
                <th 
                    onClick={() => sortFunc('email')}>
                        Email  
                        <img 
                            style={statuses.email === 1 ? {transform: 'rotate(180deg)'} : {}} 
                            src={Arrow} alt='arrow'>
                        </img>
                </th>
                <th 
                    onClick={() => sortFunc('phone')}>
                        Phone  
                        <img 
                            style={statuses.phone === 1 ? {transform: 'rotate(180deg)'} : {}} 
                            src={Arrow} alt='arrow'>
                        </img>
                </th>
            </tr>
            {data.map(item => {
                return (
                    <tr key={k++} onClick={() => infoFunc(item.id)}>
                        <td style={{borderRight: '1px solid #bababa', textAlign: 'center'}}>{item.id}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                    </tr>
                )
            })}
        </table>
    );
};

export default Table;