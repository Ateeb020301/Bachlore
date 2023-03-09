import * as C from './styles'
import { Theme } from '../../components/Theme/intex'
import {Link, useNavigate} from 'react-router-dom'
import {useForm, FormActions} from '../../context/FormContext'
import {ChangeEvent, useEffect} from 'react'
import React from 'react'

export const FormStep3 = () => {
    const {state, dispatch} = useForm()
    const navigate = useNavigate()

    const handleNextStep = () =>{
        if(state.email !== '' && state.github !== '') {
            navigate('../step4')
        } else{
            alert('preencha os dados corretamente')
        }

    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>{
        dispatch({
            type: FormActions.setEmail,
            payload: e.target.value
        })
    }

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) =>{
        dispatch({
            type: FormActions.setGithub,
            payload: e.target.value
        })
    }

    useEffect(()=>{
        if(state.name === '') {
            navigate('/')
        } else{
            dispatch({
                type: FormActions.setCurrentStep,
                payload: 3
            })
        }
        

    },[])

    return(
        <Theme>
            <C.Container>
                <p className='passo'>Passo 3/3</p>
                <h4>Legal {state.name}, Her kan du fylle inn informasjon om deg</h4>
                <p>Oppgi Email og URL til din GitHub</p>

                <label>Email</label>
                <input 
                type="email" 
                onChange={handleEmailChange}
                />

                <label>Url til Github</label>
                <input 
                type="url" 
                onChange={handleUrlChange}
                />

                <div>
                    {/* <Link to='/step2'>Voltar</Link> */}
                    <button onClick={handleNextStep}>Ferdig</button>
                </div>

            </C.Container>
        </Theme>
    )
}