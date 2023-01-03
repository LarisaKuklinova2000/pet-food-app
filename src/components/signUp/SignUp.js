import { useState } from "react";
import ApiService from "../../services/ApiService";
import './signUp.scss'

const SignUp = (props) => {

    const [email, setEmail] = useState("");
    const [group, setGroup] = useState("");
    const [password, setPassword] = useState("");

    const apiService = new ApiService();

    return (
        <form className="signUpForm" action="">
            <div className="form__wrapper">
                <h1>Регистрация</h1>
                <p>пожалуйста, заполните форму создания аккаунта</p>

                <label htmlFor="email"><b>Почта</b></label>
                <input 
                    className="signInput" 
                    type="text" 
                    placeholder="введите почту" 
                    name="email" 
                    required
                    onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="group"><b>Ваша группа</b></label>
                <input 
                    className="signInput" 
                    type="text" 
                    placeholder="введите Вашу группу" 
                    name="group" 
                    required
                    onChange={(e) => setGroup(e.target.value)} />

                <label htmlFor="password"><b>Пароль</b></label>
                <input 
                    className="signInput"
                    placeholder="введите пароль" 
                    name="password" 
                    required
                    onChange={(e) => setPassword(e.target.value)} />

                <button 
                    type="submit" 
                    className="registerbtn"
                    onClick={(e)=> {
                        e.preventDefault();
                        apiService.signUp({email: email, group: group, password: password})
                            .then(() => {
                                alert(`регистрация прошла успешно! Ваши данные для авторизации: почта: ${email}, пароль: ${password}`);
                                document.querySelector('.signUpForm').reset();
                                document.querySelector('.form__wrapper').style.display = 'none'
                                document.querySelector('.authorization__wrapper').style.display = 'block'
                            })
                    }}
                    >регистрация</button>
                
                <div className="container signin">
                    <p>Уже есть аккаунт? 
                        <button
                            type="button"
                            onClick={() => {document.querySelector('.form__wrapper').style.display = 'none';
                                            document.querySelector('.authorization__wrapper').style.display = 'block' 
                        }}> войдите</button>.
                    </p>
                </div>

            </div>

            <div className="authorization__wrapper">
                <h1>Авторизация</h1>
                <p>пожалуйста, заполните форму авторизации</p>

                <label htmlFor="email"><b>Почта</b></label>
                <input 
                    className="signInput" 
                    type="text" 
                    placeholder="введите почту" 
                    name="email" 
                    required
                    onChange={(e) => setEmail(e.target.value)}/>

                <label htmlFor="password"><b>Пароль</b></label>
                <input 
                    className="signInput"
                    placeholder="введите пароль" 
                    name="password" 
                    required
                    onChange={(e) => setPassword(e.target.value)}/>

                <button 
                    type="submit" 
                    className="registerbtn"
                    onClick={(e) => {
                        e.preventDefault();
                        apiService.signIn({email: email, password: password})
                            .then(res => props.onUpdateToken(res.token))
                    }}
                    >авторизация</button>

                <div className="container signin">
                    <p>Вернуться к регистрации? 
                        <button
                            type="button"
                            onClick={() => {document.querySelector('.form__wrapper').style.display = 'block';
                                            document.querySelector('.authorization__wrapper').style.display = 'none' 
                        }}> возвращаемся</button>.
                    </p>
                </div>
            </div>
        </form>
    )
}

export default SignUp;