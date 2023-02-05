import { useState } from "react";

import SignModal from "./comp/sign-modal";
import { Card } from "../../../components";

import "./Signs.sass";

const Signs = ({ signs }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="signs">
            {showModal && <SignModal setShowModal={setShowModal} />}
            {signs.map((sign) => (
                <Card
                    header={sign.name}
                    img={sign.svg}
                    action={() => setShowModal(true)}
                />
            ))}
        </div>
    );
};

export default Signs;
