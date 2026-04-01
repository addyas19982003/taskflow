import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import api from '../../api/axios';
import styles from './LoginBS.module.css';

export default function LoginBS() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (state.user) {
      navigate(from, { replace: true });
    }
  }, [state.user, navigate, from]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const { data: users } = await api.get(`/users?email=${email}`);
      if (users.length === 0 || users[0].password !== password) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Email ou mot de passe incorrect' });
        return;
      }
      const { password: _, ...user } = users[0];
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur serveur' });
    }
  }

  return (
    <Container className={`d-flex justify-content-center align-items-center ${styles.container}`}>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title className={`text-center ${styles.title}`}>TaskFlow</Card.Title>
          <p className="text-center text-muted mb-4">Connectez-vous pour continuer</p>
          {state.error && <Alert variant="danger">{state.error}</Alert>}
          {state.loading && <div className="text-center mb-3">Connexion en cours...</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                required 
                disabled={state.loading}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                required 
                disabled={state.loading}
              />
            </Form.Group>
            <Button type="submit" className="w-100" disabled={state.loading}>
              {state.loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
