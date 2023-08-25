import React from 'react';
import './Info.css';

const Info = ({ data }) => {

    return (
        <div className='info'>
            <div className="info__title">Выбран пользователь <b>{data.firstName} {data.lastName}</b></div>
            <label className='info__block'>
                Описание:
                <div className='info__descr'>{data.description}</div>
            </label>
            <div className="info__address">
                Адрес проживания: <b>{data.address.streetAddress}</b><br/><br/>
                Город: <b>{data.address.city}</b><br/><br/>
                Провинция/Штат: <b>{data.address.state}</b><br/><br/>
                Индекс: <b>{data.address.zip}</b>
            </div>
        </div>
    );
};

export default Info;