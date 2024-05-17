import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_TASK_MUTATION, UPDATE_TASK_MUTATION, DELETE_TASK_MUTATION } from '../graphql/mutations';
import { GET_TASKS_QUERY } from '../graphql/queries';
import styled from '@emotion/styled';
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Checkbox,
    CircularProgress,
    ListItemSecondaryAction,
    Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Root = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
`;

const TaskInput = styled.div`
    display: flex;
    margin-bottom: 16px;
`;

const TaskList = styled(List)`
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 8px;
`;

const TaskItem = styled(ListItem)`
    background-color: #ffffff;
    border-radius: 4px;
    margin-bottom: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }
`;

const CircularLoading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
`;



const TaskManagement = () => {
    const [newTaskName, setNewTaskName] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);
    const [editTaskName, setEditTaskName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoadingTimeout, setIsLoadingTimeout] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingTimeout(true);
        }, 5000); // 5000 milliseconds = 5 seconds

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const { loading, error, data, refetch } = useQuery(GET_TASKS_QUERY, {
        notifyOnNetworkStatusChange: true,
        onCompleted: () => {
            setEditTaskId(null);
            setEditTaskName('');
        },
        onError: (error) => {
            console.error('Error fetching tasks:', error);
            toast.error('Failed to fetch tasks. Please try again later.');
        },
        context: {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        },
    });
    console.log(data,loading)

    const [createTask] = useMutation(CREATE_TASK_MUTATION, {
        onError: (error) => {
            console.error('Create task error:', error);
            toast.error('Failed to create task. Please try again.');
        },
        context: {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        },
    });

    const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
        onError: (error) => {
            console.error('Update task error:', error);
            toast.error('Failed to update task. Please try again.');
        },
        context: {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        },
    });

    const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
        onError: (error) => {
            console.error('Delete task error:', error);
            toast.error('Failed to delete task. Please try again.');
        },
        context: {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        },
    });

    const handleCreateTask = async () => {
        try {
            await createTask({ variables: { input: { name: newTaskName, complete: false } } });
            setNewTaskName('');
            refetch();
            toast.success('Task created successfully!');
        } catch (error) {
            console.error('Create task error:', error);
            toast.error('Failed to create task. Please try again.');
        }
    };

    const handleUpdateTask = async (id, name, complete) => {
        try {
            await updateTask({ variables: { id, input: { name, complete } } });
            refetch();
            toast.success('Task updated successfully!');
        } catch (error) {
            console.error('Update task error:', error);
            toast.error('Failed to update task. Please try again.');
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask({ variables: { id } });
            refetch();
            toast.success('Task deleted successfully!');
        } catch (error) {
            console.error('Delete task error:', error);
            toast.error('Failed to delete task. Please try again.');
        }
    };

    return (
        <Root>
            <Typography variant="h4" gutterBottom>
                Task Management
            </Typography>
            <TaskInput>
                <TextField
                    label="New Task"
                    variant="outlined"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateTask}
                                disabled={!newTaskName}
                            >
                                <AddIcon />
                            </Button>
                        ),
                    }}
                />
            </TaskInput>
            {loading ? (
                isLoadingTimeout ? (
                    <Alert severity="warning">Loading is taking longer than expected. Please wait...</Alert>
                ) : (
                    <CircularLoading>
                        <CircularProgress />
                    </CircularLoading>
                )
            ) : error ? (
                <Alert severity="error">{errorMessage || 'An error occurred. Please try again later.'}</Alert>
            ) : data.tasks.length > 0 ? (
                <TaskList>
                    {data.tasks.map((task) => (
                        <TaskItem key={task.id}>
                            <ListItemText
                                primary={
                                    editTaskId === task.id ? (
                                        <TextField
                                            value={editTaskName}
                                            onChange={(e) => setEditTaskName(e.target.value)}
                                            onBlur={() => handleUpdateTask(task.id, editTaskName, task.complete)}
                                            fullWidth
                                        />
                                    ) : (
                                        task.name
                                    )
                                }
                                secondary={task.complete ? 'Completed' : 'Incomplete'}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="Edit"
                                    onClick={() => {
                                        setEditTaskId(task.id);
                                        setEditTaskName(task.name);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="Delete"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <Checkbox
                                    checked={task.complete}
                                    onChange={() => handleUpdateTask(task.id, task.name, !task.complete)}
                                />
                            </ListItemSecondaryAction>
                        </TaskItem>
                    ))}
                </TaskList>
            ) : (
                <Typography variant="body1" align="center">
                    No tasks found. Start adding tasks using the input above.
                </Typography>
            )}
            <ToastContainer />
        </Root>
    );
};


export default TaskManagement;
