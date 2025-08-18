import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form, InputGroup } from "react-bootstrap";

const BASE = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");
const API = `${BASE}/api`;


export const AdminDashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    text: "",
    emoji: "",
    value: "",
    relation: "", // Pelicula | Serie | Libro
    img: ""
  });
  const token = localStorage.getItem("token"); // { token, user }

  function getAuthHeaders() {
    try {
      if (!token) return { "Content-Type": "application/json" };
      return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
    } catch {
      return { "Content-Type": "application/json" };
    }
  }


  const fetchCards = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/cards`);
      const data = await res.json();
      setCards(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ text: "", emoji: "", value: "", relation: "", img: "" });
    setShow(true);
  };

  const openEdit = (card) => {
    setEditing(card.id);
    setForm({
      text: card.text || "",
      emoji: card.emoji || "",
      value: card.value || "",
      relation: card.relation || "",
      img: card.img || ""
    });
    setShow(true);
  };

  const closeModal = () => setShow(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const saveCard = async () => {
    if (!form.text || !form.value || !form.relation) {
      alert("Texto, Valor y Relación son obligatorios");
      return;
    }
    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `${API}/cards/${editing}` : `${API}/cards`;
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(), // ← token aquí
        body: JSON.stringify(form)
      });
      if (res.status === 401) return alert("Debes iniciar sesión.");
      if (res.status === 403) return alert("Acceso solo para administradores.");
      if (!res.ok) throw new Error("Error guardando la carta");
      await fetchCards();
      closeModal();
    } catch (e) {
      console.error(e);
      alert("No se pudo guardar la carta");
    }
  };

  const deleteCard = async (id) => {
    if (!confirm("¿Eliminar esta carta?")) return;
    try {
      const res = await fetch(`${API}/cards/${id}`, { method: "DELETE", headers: getAuthHeaders() });
      if (res.status === 401) return alert("Debes iniciar sesión.");
      if (res.status === 403) return alert("Acceso solo para administradores.");
      if (!res.ok) throw new Error("Error eliminando la carta");
      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar la carta");
    }
  };

  return (
    <div style={{ paddingTop: "100px", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      <Container className="py-4">
        <Row className="mb-3 align-items-center">
          <Col><h2 className="mb-0">Admin • Cartas</h2></Col>
          <Col className="text-end">
            <Button onClick={openCreate}>+ Añadir carta</Button>
          </Col>
        </Row>

        {loading ? (
          <Card className="p-4 text-center">Cargando...</Card>
        ) : cards.length === 0 ? (
          <Card className="p-4 text-center">No hay cartas aún.</Card>
        ) : (
          <Row className="g-3">
            {cards.map((card) => (
              <Col key={card.id} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm">
                  {card.img ? (
                    <Card.Img variant="top" src={card.img} alt={card.text} style={{ objectFit: "cover", height: 160 }} />
                  ) : (
                    <div className="d-flex align-items-center justify-content-center" style={{ height: 160, fontSize: 48, background: "#fafafa" }}>
                      <span>{card.emoji || "🃏"}</span>
                    </div>
                  )}
                  <Card.Body>
                    <Card.Title className="mb-2">{card.text}</Card.Title>
                    <Card.Text className="mb-1"><strong>Valor:</strong> {card.value || "—"}</Card.Text>
                    <Card.Text className="mb-3"><strong>Relación:</strong> {card.relation || "—"}</Card.Text>
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" onClick={() => openEdit(card)}>Editar</Button>
                      <Button variant="outline-danger" onClick={() => deleteCard(card.id)}>Eliminar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Modal crear/editar */}
        <Modal show={show} onHide={closeModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{editing ? "Editar carta" : "Nueva carta"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="text">
                <Form.Label>Texto</Form.Label>
                <Form.Control
                  name="text"
                  value={form.text}
                  onChange={handleChange}
                  placeholder="¿Te gustan las comedias?"
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="emoji">
                    <Form.Label>Emoji</Form.Label>
                    <Form.Control
                      name="emoji"
                      value={form.emoji}
                      onChange={handleChange}
                      placeholder="😂"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="value">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control
                      name="value"
                      value={form.value}
                      onChange={handleChange}
                      placeholder="Comedia"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="relation">
                <Form.Label>Relación</Form.Label>
                <Form.Select name="relation" value={form.relation} onChange={handleChange} required>
                  <option value="">Selecciona...</option>
                  <option value="Pelicula">Pelicula</option>
                  <option value="Serie">Serie</option>
                  <option value="Libro">Libro</option>
                  {
                    cards.map((c) => {
                      return (
                        <option value={`${c.value}`}>{c.value}</option>
                      )
                    })
                  }
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2" controlId="img">
                <Form.Label>URL de imagen (opcional)</Form.Label>
                <InputGroup>
                  <InputGroup.Text>https://</InputGroup.Text>
                  <Form.Control
                    name="img"
                    value={form.img}
                    onChange={handleChange}
                    placeholder="cdn.tusitio.com/imagen.jpg"
                  />
                </InputGroup>
                <Form.Text>Si no pones imagen, se mostrará el emoji.</Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Cancelar</Button>
            <Button onClick={saveCard}>{editing ? "Guardar cambios" : "Crear"}</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};