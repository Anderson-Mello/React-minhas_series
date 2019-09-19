import React, { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const NewSerie = () => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false) //No success yet
    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        axios.post('/api/series', {
           name 
        })
        .then (res => {
            setSuccess(true)
        })
    }

    if (success) {
        return  <Redirect to='/series'/>
    }

    return (
        <div className='container'>
            <h1>New Serie</h1>
            <form>
                <div className='form-group'>
                    <label for='name'>Name</label>
                    <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Serie name'/>
                </div>
                <button onClick={save} type='button' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default NewSerie