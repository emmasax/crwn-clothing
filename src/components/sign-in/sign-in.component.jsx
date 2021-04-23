import React from 'react';
import './sign-in.styles.scss';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

class SignIn extends React.Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ email: '', password: '' })
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        type='email'
                        label='email'
                        name='email'
                        value={this.state.email}
                        required
                        handleChange={this.handleChange}
                    />
                    <FormInput
                        type='password'
                        label='password'
                        name='password'
                        value={this.state.password}
                        required
                        handleChange={this.handleChange}
                    />
                    <CustomButton type='submit'>Sign in</CustomButton>
                </form>
            </div>
        )
    }
};

export default SignIn;
