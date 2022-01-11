import React, { useState, useEffect, useMemo } from 'react';
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

export default function Phonebook () {

    const [contacts, setContacts] = useState(data);
    const [filter, setFilter] = useState('');

    const addContact = ({ name, number }) => {
        const contact = {
            id: nanoid(),
            name,
            number,
        };

        if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
            alert(`${name} is already in contacts`);
            return;
        }

        setContacts([contact, ...contacts]);
    }

    const deleteContact = contactId => {
        setContacts(
            contacts.filter(contact => contact.id !== contactId),
        )
    }

    const changeFilter = event => {
        setFilter( event.currentTarget.value )
    }

    const normalizedFilter = useMemo(() => filter.toLowerCase(), [filter])

    const getCurrentPhonebook = () => {
        return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter.trim()));
    }

    useEffect(() => { 
        const contacts = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contacts);
        if (parsedContacts) {
        setContacts( parsedContacts );
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts])

    return (
        <Wrapper>
            <Heading>Phonebook</Heading>
            <ContactForm onAddContact={addContact} />
            <SubHeading>Contacts</SubHeading>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList contacts={getCurrentPhonebook()} onDeleteContact={deleteContact} />
        </Wrapper>
    );
    
}

