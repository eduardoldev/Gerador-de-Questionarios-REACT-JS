import { BsFillHouseFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function MostrarQuestionarioPage(props) {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 996px)' })
    const navigate = useNavigate();
    const location = useLocation();
    const [questionario, setQuestionario] = useState([]);
    const [alternativasAleatorias, setAlternativasAleatorias] = useState([]);
    const [showCorreta, setShowCorreta] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);

    const handleNextQuestion = () => {
        if (currentPage < questionario.length - 1) {
            const nextIndex = currentPage + 1;
            const shuffledAlternativas = shuffleArray(questionario[nextIndex].alternativas.slice());
            setAlternativasAleatorias(shuffledAlternativas);
            setCurrentPage(nextIndex);
            setShowCorreta(false);
        } else {
            alert("Você chegou ao final do questionário.");
        }
    };

    useEffect(() => {
        if (!location.state?.questionario) {
            navigate('/');
        } else {
            console.log(questionario);
            const shuffledAlternativas = shuffleArray(location.state.questionario[0].alternativas.slice());
            setAlternativasAleatorias(shuffledAlternativas);
        }
        setQuestionario(location.state?.questionario);
    }, []);

    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex, temporaryValue;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    };

    return (
        <>
            {isTabletOrMobile ? <>
                {questionario.map((questao, index) => {
                    return (<>
                        {index === currentPage && (  // Renderizar apenas a pergunta da página atual
                            <Container className="vh-100 d-flex col align-items-center" fluid style={{ background: `url(${questao.imagem})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                <Container>

                                    <Row className="gap-3">
                                        <div className="p-0 mb-1">
                                            <Link to='/' className="bg-dark p-3 rounded">
                                                <BsFillHouseFill color="#fff" size={25} />
                                            </Link>
                                        </div>
                                        <div className="rounded text-bg-dark p-3">
                                            <span className="h2">Pergunta: {questao.pergunta}</span>
                                        </div>
                                        <div className="rounded text-bg-dark p-3">
                                            <span className="h2">a) {alternativasAleatorias[0]}</span>
                                        </div>
                                        <div className="rounded text-bg-dark p-3">
                                            <span className="h2">b) {alternativasAleatorias[1]}</span>
                                        </div>
                                        <div className="rounded text-bg-dark p-3">
                                            <span className="h2">c) {alternativasAleatorias[2]}</span>
                                        </div>
                                        <div className="rounded text-bg-dark p-3">
                                            <span className="h2">d) {alternativasAleatorias[3]}</span>
                                        </div>
                                        {showCorreta ? <div className="rounded text-bg-success p-3">
                                            <span className="h2">Alternativa correta: {questao.alternativa_correta}</span>
                                        </div> : ''}
                                    </Row>
                                    <Row className="mt-3 gap-1">
                                        <Button variant="success" onClick={() => { setShowCorreta(true); }} className="align-end p-3 w-100 fs-3">Mostrar resposta</Button>
                                        <Button variant="primary" className="align-end p-3 w-100 fs-3" onClick={handleNextQuestion}>Próxima</Button>
                                    </Row>
                                </Container>
                            </Container>)}
                    </>
                    )
                })}
            </> : <>
                {questionario.map((questao, index) => {
                    return (<>
                        {index === currentPage && (  // Renderizar apenas a pergunta da página atual
                            <Container className="vh-100 d-flex col align-items-center" fluid style={{ background: `url(${questao.imagem})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                <div className="bg-dark p-3 rounded mt-3" style={{ position: 'absolute', top: 0 }}>
                                    <Link to='/'>
                                        <BsFillHouseFill color="#fff" size={50} />
                                    </Link>
                                </div>
                                <Container>
                                    <Row className="gap-3">
                                        <div className="rounded text-bg-dark p-3">
                                            <span className="h2">Pergunta: {questao.pergunta}</span>
                                        </div>
                                        <div className="rounded text-bg-dark p-3">
                                            <span className="h2">a) {alternativasAleatorias[0]}</span>
                                        </div>
                                        <div className="rounded text-bg-dark p-3">
                                            <span className="h2">b) {alternativasAleatorias[1]}</span>
                                        </div>
                                        <div className="rounded text-bg-dark p-3">
                                            <span className="h2">c) {alternativasAleatorias[2]}</span>
                                        </div>
                                        <div className="rounded text-bg-dark p-3">
                                            <span className="h2">d) {alternativasAleatorias[3]}</span>
                                        </div>
                                        {showCorreta ? <div className="rounded text-bg-success p-3">
                                            <span className="h2">Alternativa correta: {questao.alternativa_correta}</span>
                                        </div> : ''}
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <Button variant="success" onClick={() => { setShowCorreta(true); }} className="align-end p-3 w-100 fs-3">Mostrar resposta</Button>
                                        </Col>
                                        <Col>
                                            <Button variant="primary" className="align-end p-3 w-100 fs-3" onClick={handleNextQuestion}>Próxima</Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Container>)}
                    </>
                    )
                })}
            </>}

        </>);
}
export default MostrarQuestionarioPage;
