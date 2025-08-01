import style from "./Forms.module.css"
import { Container, Image } from "react-bootstrap";
import { useEffect } from 'react';
import FlexMasonry from 'flexmasonry';

export default function Forms() {
  useEffect(() => {
    FlexMasonry.init('.grid');
  }, []);

    return (
        <Container className={style.container}>
            <div className={style.grid}>
                <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06S5-yW9KYF0GH1UXK2zVe5CAH0DEj80lEQ&s" alt=""/> </div>
                <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06S5-yW9KYF0GH1UXK2zVe5CAH0DEj80lEQ&s" alt=""/> </div>
                <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06S5-yW9KYF0GH1UXK2zVe5CAH0DEj80lEQ&s" alt=""/> </div>
                <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06S5-yW9KYF0GH1UXK2zVe5CAH0DEj80lEQ&s" alt=""/> </div>
                <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06S5-yW9KYF0GH1UXK2zVe5CAH0DEj80lEQ&s" alt=""/> </div>
                <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06S5-yW9KYF0GH1UXK2zVe5CAH0DEj80lEQ&s" alt=""/> </div>
                <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06S5-yW9KYF0GH1UXK2zVe5CAH0DEj80lEQ&s" alt=""/> </div>
                <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06S5-yW9KYF0GH1UXK2zVe5CAH0DEj80lEQ&s" alt=""/> </div>
                <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06S5-yW9KYF0GH1UXK2zVe5CAH0DEj80lEQ&s" alt=""/> </div>
            </div>
        </Container>
    )
}