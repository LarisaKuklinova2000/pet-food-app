import {useSelector} from 'react-redux'
import { Navigate, useNavigate } from "react-router-dom"
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { useSignUpMutation} from '../../api/apiSlice'
import './signUp.scss'

const SignUp = () => {

    const {token} = useSelector(state => state.regInfo)

    const navigate = useNavigate();

    const [signUp] = useSignUpMutation()

    const regForm = 
        <div className="form__wrapper">
            <h1>Регистрация</h1>
            <p>пожалуйста, заполните форму создания аккаунта</p>
            <Formik
                initialValues={{
                    email: '',
                    group: '',
                    password: '',
                }}
                validationSchema = {Yup.object({
                    email: Yup.string()
                            .email('неверно введена почта')
                            .required('поле обязательно для заполнения'),
                    group: Yup.string().max(4, 'не более 4 символов').required('укажите группу'),
                    password: Yup.string().min(3, 'не менее 3-х символов').required('придумайте пароль'),
                })}
                onSubmit={(values) => {
                    signUp(values).unwrap()
                        .then((res) => {
                            navigate('/signIn')
                        })
                        .catch(() => alert('регистрация не удалась попробуйте ещё раз'))
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

                    <label htmlFor="group"><b>Ваша группа</b></label>
                    <Field 
                        className="signInput"
                        placeholder="введите Вашу группу"
                        name="group"
                        id='group'
                    />
                    <ErrorMessage className="error" name='group' component='div'/>

                    <label htmlFor="password"><b>Пароль</b></label>
                    <Field 
                        className="signInput"
                        placeholder="придумайте пароль"
                        name="password"
                        id='password'
                    />
                    <ErrorMessage className="error" name='password' component='div'/>

                    <button className="registerbtn" type="submit">регистрация</button>
                </Form>
            </Formik>
        </div>

    
    return (
        <div className="signUpForm" action="">
            {token? <Navigate to='/catalog' />: regForm}
            <div className="signin">
                <p>Уже есть аккаунт? 
                    <button
                        type="button"
                        onClick={() => {
                            navigate('/signin')
                        }
                    }> к форме авторизации</button>
                </p>
            </div>
        </div>
    )
}

export default SignUp;