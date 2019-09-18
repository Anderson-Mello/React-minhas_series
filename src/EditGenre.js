import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditGenre = ({match}) => {
    //const {match} = props
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false) //No success yet

    useEffect(() => { //When run first time
        axios
        .get('/api/genres/' + match.params.id)
        .then(res => {
            setName(res.data.name)
        })
    }, [match.params.id]) //Dependency. If id change need run again

    const onChange = evt => {
        setName(evt.target.value)
    }
    const save = () => {
        axios
        .put('/api/genres/' + match.params.id, {
           name 
        })
        .then (res => {
            setSuccess(true)
        })
    }

    if (success) {
        return  <Redirect to='/genres'/>
    }

    return (
        <div className='container'>
            <h1>Edit Genre</h1>
            <form>
                <div className='form-group'>
                    <label for='name'>Name</label>
                    <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Genre name'/>
                </div>
                <button onClick={save} type='button' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}

export default EditGenre