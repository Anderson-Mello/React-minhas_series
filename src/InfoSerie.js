import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Badge } from 'reactstrap'

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({
        name: ''
    })
    const [success, setSuccess] = useState(false) //No success yet
    const [mode, setMode] = useState('INFO')
    const [genre, setGenre] = useState([])
    const [genreId, setGenreId] = useState('')

    const [data, setData] = useState({})

    useEffect(() => { //quando carregar o componente ele trás os dados
        axios
            .get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
    }, [match.params.id])

    useEffect(() => { //quando carregar o componente ele trás os dados
        axios
            .get('/api/genres/')
            .then(res => {
                setGenre(res.data.data)
                const genres = res.data.data
                const found = genres.find(value => data.genre === value.name) 
                if (found) {
                    setGenreId(found.id)
                }
            })
    }, [data])

    //custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const onChangeGenre = evt => {
        setGenreId(evt.target.value)
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const selectStatus = value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    const save = () => {
        axios
            .put('/api/series/' + match.params.id, {
                ...form,
                genre_id: genreId
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
                                    { data.status === 'WATCHED' && <Badge color='success'>Watched</Badge> }
                                    { data.status === 'TO_WATCH' && <Badge color='warning'>To watch</Badge> }
                                    <br />Genre: {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {
                mode === 'INFO' &&

                <div class='container'>
                    <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Edit</button>
                </div>
            }

            {
                mode === 'EDIT' &&

                <div className='container'>
                    <h1>Edit Serie</h1>
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
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='comments' placeholder='Comments' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='genre'>Genre</label>
                            <select className='form-control' onChange={onChangeGenre} value={genreId}>
                                {genre.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                            </select>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' checked={form.status === 'WATCHED'} name='status' id='watched' value='WATCHED' onChange={selectStatus('WATCHED')}/>
                            <label className='form-check-label' htmlFor='watched'>
                                Watched
                            </label>
                        </div>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' checked={form.status === 'TO_WATCH'} name='status' id='toWatch' value='TO_WATCH' onChange={selectStatus('TO_WATCH')}/>
                            <label className='form-check-label' htmlFor='toWatch'>
                                To watch
                            </label>
                        </div>
                        <br/>
                        <button onClick={save} type='button' className='btn btn-success'>Submit</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default InfoSerie