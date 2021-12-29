import React, { Component } from 'react';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px;

  margin-bottom: 20px;
  border: solid 1px black;
  border-radius: 5px;
`;

const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  font-weight: 600;
  color: black;
`;

const FormTitle = styled.h3`
  margin-bottom: 10px;
`;

const FormInput = styled.input`
  border-radius: 3px;
  border: solid 2px black;
  :focus {
    outline: none;
    box-shadow: 0px 0px 3px 3px blue;
    border: solid 1px black;
  }
`;

const FormButton = styled.button`
  padding: 2px 4px;
  width: 120px;

  cursor: pointer;
  color: black;
  background-color: white;
  border-radius: 4px;
  border: solid 1px black;
  

  font-weight: 600;
  font-size: 16px;
  line-height: 1.875;
  align-items: center;
  text-align: center;
  
  :hover {
    color: white;
    background-color: lightgreen;
  }
`;

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
        id: '',
    }

    changeState = event => {
        const { name, value } = event.currentTarget;
        this.setState({
            [name]: value,
        });
    }

    contactSubmit = event => {
        event.preventDefault();
        const { name, value } = event.currentTarget;
        this.setState({
            [name]: value,
        });
        this.props.onAddContact(this.state);
        this.reset();
    }

    reset = () => {
        this.setState({ name: '', number: '' });
    }

    render() {
        const { name, number } = this.state;

        return (
            <FormWrapper onSubmit={this.contactSubmit}>
                <FormLabel>
                    <FormTitle>Name</FormTitle>
                    <FormInput
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.changeState}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                        required
                    />
                </FormLabel>
                <FormLabel>
                    <FormTitle>Number</FormTitle>
                    <FormInput
                        type="tel"
                        name="number"
                        value={number}
                        onChange={this.changeState}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                        required
                    />
                </FormLabel>
                <FormButton type="submit">Add contact</FormButton>
            </FormWrapper>
        );
    }
}

export default ContactForm;