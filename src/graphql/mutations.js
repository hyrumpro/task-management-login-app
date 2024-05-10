import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
    mutation LoginUser($input: LoginInput!) {
        login(input: $input) {
            token
            user {
                id
                name
                email
            }
        }
    }
`;

export const REGISTER_MUTATION = gql`
    mutation RegisterUser($input: RegisterInput!) {
        register(input: $input) {
            id
            name
            email
        }
    }
`;

export const CREATE_TASK_MUTATION = gql`
    mutation CreateTask($input: CreateTaskInput!) {
        createTask(input: $input) {
            id
            name
            complete
        }
    }
`;

export const UPDATE_TASK_MUTATION = gql`
    mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
        updateTask(id: $id, input: $input) {
            id
            name
            complete
        }
    }
`;

export const DELETE_TASK_MUTATION = gql`
    mutation DeleteTask($id: ID!) {
        deleteTask(id: $id) {
            id
        }
    }
`;
