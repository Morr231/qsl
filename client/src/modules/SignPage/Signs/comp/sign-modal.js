import { Modal } from "../../../../components";
import Webcam from "react-webcam";

const SignModal = ({ setShowModal }) => {
    return (
        <Modal
            style={{ width: "50%" }}
            setShowModal={() => setShowModal(false)}
        >
            <iframe
                src="https://drive.google.com/file/d/14CfPyyTlHNHkcmNeD7WD5MijegbQFAb3/preview"
                width="340"
                height="250"
                allow="autoplay"
                allowfullscreen
            ></iframe>
            <Webcam mirrored width="340" height="255" />
        </Modal>
    );
};

export default SignModal;
