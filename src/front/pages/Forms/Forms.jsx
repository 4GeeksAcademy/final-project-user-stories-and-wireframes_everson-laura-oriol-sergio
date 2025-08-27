import { useState, useRef, useEffect } from "react";
import style from "./Forms.module.css";
import { Container, Modal, Button } from "react-bootstrap";
import stickerBola from '../../assets/img/stickerEmojiBola.png';
import stickerCD from '../../assets/img/stickerEmojiCD.png';
import stickerBooks from '../../assets/img/stickerEmojiBooks.png';
import stickerClaqueta from '../../assets/img/stickerEmojiClaqueta.png';
import stickerPalomitas from '../../assets/img/stickerEmojiPalomitas.png';
import stickerBombilla from '../../assets/img/stickerEmojiBombilla.png';
import { useNavigate } from "react-router-dom";



const BASE = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");
const API = `${BASE}/api`;

export const Forms = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStyle, setDragStyle] = useState({});
  const [labelOpacity, setLabelOpacity] = useState({ yes: 0, no: 0 });
  const startPos = useRef(null);
  const [answers, setAnswers] = useState([]);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCards, setCurrentCards] = useState([
    { text: "¿Quieres ver una pelicula?", emoji: "🎬", value: "peliculas" },
    { text: "¿Quieres leer un libro?", emoji: "📚", value: "libros" },
    { text: "¿Quieres ver una serie?", emoji: "✈️", value: "series" },
  ]);
  const [width, setwidth] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [iaResultado, setIaResultado] = useState("");
  const navigate = useNavigate()


  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setwidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Efecto para detectar cuando no hay más cartas
  useEffect(() => {
    // Solo mostrar modal si no hay cartas Y no estamos en proceso de transición
    if (currentCards.length === 0 && answers.length > 0 && !loading) {
      // Agregar un pequeño delay para asegurar que realmente no hay más cartas
      const timer = setTimeout(() => {
        // Verificar nuevamente que seguimos sin cartas después del delay
        setCurrentCards(prev => {
          if (prev.length === 0) {
            setShowModal(true);
          }
          return prev;
        });
      }, 600); // Esperar más tiempo que la transición

      return () => clearTimeout(timer);
    }
  }, [currentCards, answers, loading]);

  const handleStart = (x) => {
    startPos.current = x;
  };

  const handleMove = (x) => {
    if (startPos.current !== null) {
      const deltaX = x - startPos.current;
      setDragStyle({
        transform: `translateX(${deltaX}px) rotate(${deltaX / 10}deg)`,
      });
      setLabelOpacity({
        yes: deltaX > 0 ? Math.min(deltaX / 100, 1) : 0,
        no: deltaX < 0 ? Math.min(-deltaX / 100, 1) : 0,
      });
    }
  };

  const handleEnd = (x, cardsParams) => {
    const deltaX = x - startPos.current;
    let currentCard = cardsParams[currentIndex];

    if (deltaX > 100) {
      animateOut(1, cardsParams);
      setAnswers([...answers, currentCard.value]);
      let filterCards = cards.filter(c => c.relation.toLowerCase() === currentCard.value.toLowerCase());

      // Temporizador para que las nuevas tarjetas aparezcan suavemente
      setTimeout(() => {
        // Solo ocultar temporalmente si hay nuevas cartas que mostrar
        if (filterCards.length > 0) {
          setCurrentCards([]);

          // Después de un breve momento, mostrar las nuevas cartas
          setTimeout(() => {
            setCurrentCards(filterCards);
            setCurrentIndex(0);
          }, 150);
        } else {
          // Si no hay más cartas, limpiar inmediatamente
          setCurrentCards([]);
          setCurrentIndex(0);
        }
      }, 400);

    } else if (deltaX < -100) {
      animateOut(-1, cardsParams);
    } else {
      setDragStyle({ transform: "translateX(0px) rotate(0deg)" });
      setLabelOpacity({ yes: 0, no: 0 });
    }
    startPos.current = null;
  };

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

  const animateOut = (direction, cards) => {
    setDragStyle({
      transform: `translateX(${direction * 1000}px) rotate(${direction * 45}deg)`,
      transition: "transform 0.5s ease-out",
    });
    setTimeout(() => {
      const nextIndex = (currentIndex + 1) % cards.length;
      setCurrentIndex(nextIndex);
      setDragStyle({});
      setLabelOpacity({ yes: 0, no: 0 });
    }, 500);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/")
  };

  const handleRestart = () => {
    setShowModal(false);
    setAnswers([]);
    setCurrentIndex(0);
    setCurrentCards([
      { text: "¿Quieres ver una pelicula?", emoji: "🎬", value: "Pelicula" },
      { text: "¿Quieres leer un libro?", emoji: "📚", value: "Libro" },
      { text: "¿Quieres ver una serie?", emoji: "✈️", value: "Serie" },
    ]);
  };

  const getResponse = async () => {
    let res = await fetch(API + "/recommendations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        preferences: answers,
        category: answers[0]
      })
    })
    let data = await res.json()
    setIaResultado(data)
  }

  if (loading) {
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      opacity: 0.7
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Cargando nuevas opciones...</p>
      </div>
    </div>
  }

  return (
    <Container fluid className={style.container}>
      {width > 480 && (
        <div className="sticker-container">
          <img src={stickerBola} className="sticker" draggable={false} id="sticker1" alt="Sticker Bola" />
          <img src={stickerCD} className="sticker" draggable={false} id="sticker2" alt="Sticker CD" />
          <img src={stickerBooks} className="sticker" draggable={false} id="sticker3" alt="Sticker Books" />
          <img src={stickerClaqueta} className="sticker" draggable={false} id="sticker4" alt="Sticker Claqueta" />
          <img src={stickerPalomitas} className="sticker" draggable={false} id="sticker5" alt="Sticker Palomitas" />
          <img src={stickerBombilla} className="sticker" draggable={false} id="sticker6" alt="Sticker Bombilla" />
        </div>
      )}

      {currentCards.length > 0 ? currentCards
        .slice(currentIndex, currentIndex + 3)
        .map((card, index) => {
          const isTop = index === 0;
          const zIndex = currentCards.length - index;
          const scale = 1 - index * 0.05;
          const translateY = index * 10;

          return (
            <div
              key={`${currentIndex}-${index}-${card.value}`}
              className={style.card}
              style={{
                zIndex,
                transform: isTop
                  ? dragStyle.transform || ` translateY(${translateY}px)`
                  : ` translateY(${translateY}px)`,
                transition: isTop ?
                  dragStyle.transition || "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease" :
                  "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease",
                opacity: 1,
                animation: "cardAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
              onMouseDown={isTop ? (e) => handleStart(e.clientX) : null}
              onMouseMove={isTop ? (e) => startPos.current !== null && handleMove(e.clientX) : null}
              onMouseUp={isTop ? (e) => handleEnd(e.clientX, currentCards) : null}
              onMouseLeave={isTop ? (e) => startPos.current !== null && handleEnd(e.clientX, currentCards) : null}
              onTouchStart={isTop ? (e) => handleStart(e.touches[0].clientX) : null}
              onTouchMove={isTop ? (e) => handleMove(e.touches[0].clientX) : null}
              onTouchEnd={isTop ? (e) => handleEnd(e.changedTouches[0].clientX, currentCards) : null}
            >
              {isTop && (
                <>
                  <div
                    className={`${style.label} ${style.yes}`}
                    style={{ opacity: labelOpacity.yes }}
                  >
                    YES
                  </div>
                  <div
                    className={`${style.label} ${style.no}`}
                    style={{ opacity: labelOpacity.no }}
                  >
                    NO
                  </div>
                </>
              )}
              <span className={style.emoji}>{card.emoji}</span>
              <p className={style.text}>{card.text}</p>
            </div>
          );
        }) : (
        <div
          className={style.card}
          style={{
            opacity: 0.8,
            animation: "cardAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          <span className={style.emoji}></span>
          <p className={style.text}></p>
        </div>
      )}

      {/* Modal de Resumen */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>🎉 Resumen de tu Selección</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ textAlign: 'center' }}>
            {
              !iaResultado ? (
                <h5>¡Genial! Has completado tu selección</h5>

              ) : (
                <h3 style={{ margin: 0, color: '#1565c0' }}>
                  {iaResultado.category}
                </h3>
              )
            }
            {
              !iaResultado ? (
                <>
                  {answers.length > 0 && (
                    <div style={{ margin: '20px 0' }}>
                      <h6>Tu recorrido:</h6>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        {answers.map((answer, index) => (
                          <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{
                              background: '#f8f9fa',
                              padding: '8px 16px',
                              borderRadius: '20px',
                              border: '2px solid #dee2e6',
                              fontWeight: 'bold'
                            }}>
                              {answer}
                            </span>
                            {index < answers.length - 1 && (
                              <span style={{ margin: '0 10px', fontSize: '18px' }}>→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <></>
              )
            }


            <div style={{
              background: '#e3f2fd',
              padding: '15px',
              borderRadius: '10px',
              marginTop: '20px',
              border: '1px solid #bbdefb'
            }}>
              {
                !iaResultado ? (
                  <p style={{ margin: 0, color: '#1565c0' }}>
                    Basados en tus elecciones tenemos una respuesta para ti...
                  </p>
                ) : (
                  <div style={{ display: "flex", alignItems: 'center', flexDirection: "column" }}>

                    <ul style={{ listStyle: "none", display: "flex", alignItems: 'center', flexDirection: "column", padding: 0 }} >
                      {
                        iaResultado.recommendations.map(r => {
                          return (
                            <li>
                              <h5>{r.title}</h5>
                              <p>{r.description}</p>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>

                )
              }


            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {
            !iaResultado ? (

              <Button variant="secondary" onClick={getResponse}>
                Ver resultado
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleCloseModal}>
                Salir
              </Button>
            )
          }

          <Button variant="primary" onClick={handleRestart}>
            Comenzar de nuevo
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
