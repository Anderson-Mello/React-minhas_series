import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false) //No success yet
    const [mode, setMode] = useState('INFO')

    const [data, setData] = useState({})

    useEffect(() => { //quando carregar o componente ele trás os dados
        axios
            .get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
    }, [match.params.id])


    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }
    const save = () => {
        axios.post('/api/series', {
            form
        })
            .then(res => {
                setSuccess(true)
            })
    }

    if (success) {
        return <Redirect to='/series' />
    }

    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.nome} className='img-fluid img-thumbnail' src={data.poster} />
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white'>{data.name}</h1>
                                <div className='lead text-white'>
                                    <Badge color='success'>Watched</Badge>
                                    <Badge color='warning'>To watch</Badge>
                                    <br />Genre: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {
                mode === 'INFO' &&

                <div>
                    <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Edit</button>
                </div>
            }

            {
                mode === 'EDIT' &&

                <div className='container'>
                    <h1>Edit Serie</h1>
                    <pre>{JSON.stringify(form)}</pre>
                    <div>
                        <button className='btn btn-danger' onClick={() => setMode('INFO')}>Cancel edit</button>
                    </div>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Serie name' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='comments'>Comments</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='comments ' placeholder='Comments' />
                        </div>
                        <button onClick={save} type='button' className='btn btn-success'>Submit</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSerie