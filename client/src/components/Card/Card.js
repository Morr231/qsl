import "./Card.sass";

const Card = ({ header, img, action }) => {
    return (
        <div className="card" onClick={action}>
            <img className="card__img" src={`/svgs/${img}.svg`} alt={img} />

            <div className="card__text">
                <div className="card__header">{header}</div>
            </div>
        </div>
    );
};

export default Card;
