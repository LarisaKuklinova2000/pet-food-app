import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { changeToken, changeMyInfo } from "./signSlice"
import * as Yup from 'yup'

import { useSignInMutation } from '../../api/apiSlice'
import './signUp.scss'

const SignIn = () => {

    const {token} = useSelector(state => state.regInfo)
    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [signIn] = useSignInMutation()

    const signInForm = 
        <div className="authorization__wrapper">
            <h1>Авторизация</h1>
            <p>пожалуйста, заполните форму авторизации</p>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema = {Yup.object({
                    email: Yup.string()
                            .email('неверно введена почта')
                            .required('поле обязательно для заполнения'),
                    password: Yup.string().min(3, 'не менее 3-х символов').required('введите пароль'),
                })}
                onSubmit={(values) => {
                    signIn(values).unwrap()
                        .then((res) => {
                            dispatch(changeToken(res.token))
                            dispatch(changeMyInfo(res.data))
                            localStorage.setItem('token', res.token)
                            localStorage.setItem('id', res.data._id)
                            localStorage.setItem('myInfo', JSON.stringify(res.data))
                            navigate('/catalog')
                        })
                        .catch(() => alert('вы введи неправльую почту или пароль'))
                }}
            >
                <Form>
                    <label htmlFor="email"><b>Почта</b></label>
                    <Field 
                        className="signInput"
                        placeholder="введите почту"
                        name="email"
                        id='email'
                    />
                    <ErrorMessage className="error" name='email' component='div'/>

                    <label htmlFor="password"><b>Пароль</b></label>
                    <Field 
                        className="signInput"
                        placeholder="придумайте пароль"
                        name="password"
                        id='password'
                    />
                    <ErrorMessage className="error" name='password' component='div'/>

                    <button className="registerbtn" type="submit">Авторизация</button>
                </Form>
            </Formik>
        </div>
    
    return (
        <div className="signUpForm" action="">
            {token? <Navigate to='/catalog' />: signInForm}
            <div className="signin">
                <p>нет аккаунта? 
                    <button
                        type="button"
                        onClick={() => {
                            navigate('/sign')
                        }
                    }> к регистрации</button>
                </p>
            </div>
        </div>
    )
}

export default SignIn