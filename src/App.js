import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form, Modal } from 'react-bootstrap';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });
  const [editTodoId, setEditTodoId] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setEditTodoId(null);
  };

  const handleShow = () => setShowModal(true);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async () => {
    await addTodo(formData);
    handleClose();
    fetchTodos();
  };

  const handleUpdateTodo = async () => {
    await updateTodo(editTodoId, formData);
    handleClose();
    fetchTodos();
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  useEffect(() => {
    if (dataLoaded) {
      fetchTodos();
    }
  }, [dataLoaded]);

  return (
    <Container>
      <h1>Todo App</h1>
      <Button variant="primary" onClick={handleShow}>
        Add Todo
      </Button>

      <Button variant="success" onClick={() => setDataLoaded(true)}>
        Load Data
      </Button>

      <div style={{ marginTop: '20px' }}>
        {dataLoaded && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>{todo.completed ? 'Yes' : 'No'}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => {
                        setFormData({ title: todo.title, description: todo.description, completed: todo.completed });
                        setEditTodoId(todo.id);
                        handleShow();
                      }}
                    >
                      Edit
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteTodo(todo.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editTodoId ? 'Edit Todo' : 'Add Todo'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formCompleted">
              <Form.Check
                type="checkbox"
                label="Completed"
                checked={formData.completed}
                onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {editTodoId ? (
            <Button variant="primary" onClick={handleUpdateTodo}>
              Save
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAddTodo}>
              Add Todo
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default App;
