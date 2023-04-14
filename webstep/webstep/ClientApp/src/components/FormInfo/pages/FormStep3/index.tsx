import { Theme } from '../../components/Theme/intex'
import {useNavigate} from 'react-router-dom'
import {useForm, FormActions} from '../../context/FormContext'
import {useEffect} from 'react'
import React from 'react'

export const FormStep3 = () => {
    const {state, dispatch} = useForm()
    const navigate = useNavigate()

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
            <div>
                <p className='passo' >Passo 3/3</p>
                <h4>Hei {state.name}, Kontract Planning</h4>

                <div>
                    {/* <Link to='/step2'>Voltar</Link> */}
                    {/* <button onClick={handleSubmit}>Next</button> */}
                </div>
            </div>
        </Theme>
    )
}