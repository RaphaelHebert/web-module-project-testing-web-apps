import React from 'react';
import {queryByText, render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
    const errors = screen.queryByText(/error/i);
    expect(errors).toBeNull();
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const value = document.querySelector('h1');
    expect(value).toBeInTheDocument();
    expect(value).toBeTruthy();
    expect(value).toHaveTextContent('Contact Form');
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    // const nameField = screen.queryByPlaceholderText('Edd');
    const nameField = screen.queryByLabelText("First Name*");
    expect(nameField).not.toBeNull();
    fireEvent.change(nameField, { target: { value: '1234' } });
    const err = screen.getAllByTestId('error');
    expect(err).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const submitBtn = screen.queryByRole('button');
    expect(submitBtn).not.toBeNull();
    fireEvent.click(submitBtn)
    const err = screen.getAllByTestId('error');
    expect(err).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const nameField = screen.queryByLabelText("First Name*");
    expect(nameField).not.toBeNull();
    fireEvent.change(nameField, { target: { value: '12345' } });
    const lastNameField = screen.queryByLabelText("Last Name*");
    expect(lastNameField).not.toBeNull();
    fireEvent.change(lastNameField, { target: { value: 'abcde' } });
    const submitBtn = screen.queryByRole('button');
    expect(submitBtn).not.toBeNull();
    fireEvent.click(submitBtn);
    const err = screen.getAllByTestId('error');
    expect(err).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    const text = 'Error: email must be a valid email address.'
    render(<ContactForm />);
    const submitBtn = screen.queryByRole('button');
    expect(submitBtn).not.toBeNull();
    fireEvent.click(submitBtn);
    const emailField = screen.queryByLabelText("Email*");
    expect(emailField).not.toBeNull();
    fireEvent.change(emailField, { target: { value: 'invalidEmail' } });
    const error = screen.queryByText(text);
    expect(error).not.toBeNull();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    const text = "Error: lastName is a required field."
    render(<ContactForm />);
    const submitBtn = screen.queryByRole('button');
    expect(submitBtn).not.toBeNull();
    fireEvent.click(submitBtn);
    const error = screen.queryByText(text);
    expect(error).not.toBeNull();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    const firstName = "12345";
    const lastName =  "myLastName";
    const myMail = "email@mail.com"
    render(<ContactForm />);
    const nameField = screen.queryByLabelText("First Name*");
    expect(nameField).not.toBeNull();
    fireEvent.change(nameField, { target: { value: firstName } });
    const lastNameField = screen.queryByLabelText("Last Name*");
    expect(lastNameField).not.toBeNull();
    fireEvent.change(lastNameField, { target: { value: lastName } });
    const emailField = screen.queryByLabelText("Email*");
    expect(emailField).not.toBeNull();
    fireEvent.change(emailField, { target: { value: myMail } });
    const submitBtn = screen.queryByRole('button');
    expect(submitBtn).not.toBeNull();
    fireEvent.click(submitBtn);
    const firstNameRenders = screen.getByTestId("firstnameDisplay")
    expect(firstNameRenders).toHaveTextContent('First Name: ' + firstName)
    const lastNameRenders = screen.getByTestId("lastnameDisplay")
    expect(lastNameRenders).toHaveTextContent('Last Name: ' + lastName)
    const emailRenders = screen.getByTestId("emailDisplay")
    expect(emailRenders).toHaveTextContent("Email: " + myMail)
    const messageRenders = screen.queryByTestId("messageDisplay")
    expect(messageRenders).toBeNull()
});

test('renders all fields text when all fields are submitted.', async () => {
    const firstName = "12345";
    const lastName =  "myLastName";
    const myMail = "email@mail.com";
    const message = "this is my message to you..."
    render(<ContactForm />);
    const nameField = screen.queryByLabelText("First Name*");
    expect(nameField).not.toBeNull();
    fireEvent.change(nameField, { target: { value: firstName } });
    const lastNameField = screen.queryByLabelText("Last Name*");
    expect(lastNameField).not.toBeNull();
    fireEvent.change(lastNameField, { target: { value: lastName } });
    const emailField = screen.queryByLabelText("Email*");
    expect(emailField).not.toBeNull();
    fireEvent.change(emailField, { target: { value: myMail } });
    const messageField = screen.queryByLabelText("Message");
    expect(messageField).not.toBeNull();
    fireEvent.change(messageField, { target: { value: message } });
    const submitBtn = screen.queryByRole('button');
    expect(submitBtn).not.toBeNull();
    fireEvent.click(submitBtn);
    const firstNameRenders = screen.getByTestId("firstnameDisplay")
    expect(firstNameRenders).toHaveTextContent('First Name: ' + firstName)
    const lastNameRenders = screen.getByTestId("lastnameDisplay")
    expect(lastNameRenders).toHaveTextContent('Last Name: ' + lastName)
    const emailRenders = screen.getByTestId("emailDisplay")
    expect(emailRenders).toHaveTextContent("Email: " + myMail)
    const messageRenders = screen.queryByTestId("messageDisplay")
    expect(messageRenders).toHaveTextContent("Message: " + message)
});