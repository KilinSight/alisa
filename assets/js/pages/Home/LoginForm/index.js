import React, { Component } from 'react';



class LoginForm extends Component { 

    constructor(props) {
        super(props);

        this.state = {
            login: true
        };

    }

    turnLogin = () => {
        let login = this.state.login;
        this.setState({login: !login});
    }

    submitForm = (e) => {
        e.preventDefault;
    }

    render () {
        if (this.state.login == true) {
            return (
                <div className="b-login-form">
                    <h2>Авторизация</h2>
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="login-email">Email*</label>
                            <input type="email" className="form-control" id="login-email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login-password">Пароль*</label>
                            <input type="password" className="form-control" id="login-password" placeholder="Пароль" />
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="login-remember" />
                            <label className="form-check-label" htmlFor="login-remember">Запомнить меня</label>
                        </div>
                        <button type="submit" className="btn btn--blue">Войти</button>
                    </form>
                    <button type="button" className="btn btn--pink" onClick={this.turnLogin}>Зарегистрироваться</button>                    
                </div>
            )
        }
        else {
            return (
                <div className="b-login-form">
                    <h2>Регистрация</h2>
                    <form onSubmit={this.submitForm}>
                        <div className="form-group">
                            <label htmlFor="reg-email">Email</label>
                            <input type="email" className="form-control" id="reg-email" placeholder="Email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-name">Логин</label>
                            <input type="text" className="form-control" id="reg-name" placeholder="Логин" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-password">Пароль</label>
                            <input type="password" className="form-control" id="reg-password" placeholder="Пароль" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reg-password-second">Подверждение пароля</label>
                            <input type="password" className="form-control" id="reg-password-second" placeholder="Подтверите пароль" />
                        </div>
                        <button type="submit" className="btn btn--blue">Зарегистрироваться</button>
                    </form>
                    <button type="button" className="btn btn--pink" onClick={this.turnLogin}>Войти</button>                    
                </div>
            )
        }
        
        
    }
}

export default LoginForm;
