import React, { useState } from 'react';
import './AddModal.css';
import ReactInputMask from 'react-input-mask';

const AddModal = ({ visible, closeFunc, addFunc }) => {
    const [formData, setFormData] = useState({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: {
            streetAddress: '',
            city: '',
            state: '',
            zip: ''
        },
        description: ''
    });

    function sendData(e) {
        e.preventDefault();
        addFunc(formData);
        setFormData({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: {
                streetAddress: '',
                city: '',
                state: '',
                zip: ''
            },
            description: ''
        });
    }

    return (
        <div className={`back ${visible ? 'active' : ''}`} onClick={() => closeFunc(false)}>
            <form className='modal' onClick={e => e.stopPropagation()}>
                <table className='modal__table'>
                    <tr>
                        <th>Id</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                    <tr>
                        <td>
                            <input 
                                value={formData.id}
                                onChange={e => setFormData({...formData, id: parseInt(e.target.value)})}
                                type="number"
                                required
                            />
                        </td>
                        <td>
                            <input 
                                value={formData.firstName} 
                                onChange={e => setFormData({...formData, firstName: e.target.value})} 
                                type="text" 
                                required
                            />
                        </td>
                        <td>
                            <input 
                                value={formData.lastName} 
                                onChange={e => setFormData({...formData, lastName: e.target.value})} 
                                type="text" 
                                required
                            />
                        </td>
                        <td>
                            <input 
                                value={formData.email} 
                                onChange={e => setFormData({...formData, email: e.target.value})} 
                                type="email" 
                                required
                            />
                        </td>
                        <td>
                            <ReactInputMask
                                value={formData.phone} 
                                onChange={e => setFormData({...formData, phone: e.target.value})} 
                                type="tel"
                                mask='(999)999-9999' 
                                maskChar='_'
                            />
                        </td>
                    </tr>
                </table>
                <button 
                    className='modal__btn '
                    disabled={
                        formData.id !== '' &&
                        formData.firstName !== '' &&
                        formData.lastName !== '' &&
                        formData.email !== '' &&
                        formData.phone !== ''
                            ? false
                            : true
                    }
                    onClick={sendData}
                >Добавить</button>
            </form>
        </div>
    );
};

export default AddModal;