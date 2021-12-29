import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import data from '../../data/contacts.json';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import ContactForm from '../ContactForm/ContactForm';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: venter;
  margin-bottom: 30px;

  :last-child {
    margin-bottom: 0px;
  }
`;

const Heading = styled.h1`
  margin-bottom: 20px;
  font-size: 36px;
  text-align: center;
`;

const SubHeading = styled.h2`
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
`;

class Phonebook extends Component {
    state = {
        contacts: data,
        filter: '',
    };

    addContact = ({ name, number }) => {
        const { contacts } = this.state;
        const contact = {
            id: nanoid(),
            name,
            number,
        };

        if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
            alert(`${name} is already in contacts`);
            return;
        }

        this.setState(({ contacts }) => ({
            contacts: [contact, ...contacts]
        }))
    }

    deleteContact = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== contactId),
        }))
    }

    changeFilter = event => {
        this.setState({ filter: event.currentTarget.value });
    }

    getCurrentPhonebook = () => {
        const { contacts, filter } = this.state;
        return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    }
  
    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
        if (parsedContacts) {
        this.setState({ contacts: parsedContacts });
        }
    }

    componentDidUpdate(prevPops, prevState) {
        const { contacts} = this.state;
        if (contacts !== prevState.contacts) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
        }
    }

    render() {
        const { filter } = this.state;
        const currentPhonebook = this.getCurrentPhonebook();

        return (
            <Wrapper>
                <Heading>Phonebook</Heading>
                <ContactForm onAddContact={this.addContact} />
                <SubHeading>Contacts</SubHeading>
                <Filter value={filter} onChange={this.changeFilter} />
                <ContactList contacts={currentPhonebook} onDeleteContact={this.deleteContact} />
            </Wrapper>
        );
    }
}

export default Phonebook;