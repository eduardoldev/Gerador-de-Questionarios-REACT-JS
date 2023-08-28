import { BiImage } from "react-icons/bi";
import { AiFillFileImage } from "react-icons/ai";
import { BiX } from "react-icons/bi";
import { BiQuestionMark } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import MostrarQuestionarioPage from './MostrarQuestionarioPage/MostrarQuestionarioPage';
import { useNavigate } from 'react-router-dom';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

function NovoQuestionarioPage() {
    const [questionario, setQuestionario] = useState([]);
    const [pergunta, setPergunta] = useState("");
    const [alternativa1, setAlternativa1] = useState("");
    const [alternativa2, setAlternativa2] = useState("");
    const [alternativa3, setAlternativa3] = useState("");
    const [alternativa4, setAlternativa4] = useState("");
    const [correta, setCorreta] = useState("");
    const [imagem, setImagem] = useState(null);
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const adicionarPergunta = () => {
        const imagemBase64 = () => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(imagem);
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = (error) => {
                    reject(error);
                };
            });
        };

        imagemBase64()
            .then((imagemBase64Data) => {
                const novaPergunta = {
                    pergunta,
                    alternativas: [alternativa1, alternativa2, alternativa3, alternativa4],
                    alternativa_correta: alternativa1,
                    imagem: imagemBase64Data,
                };
                setQuestionario([...questionario, novaPergunta]);
                setPergunta("");
                setAlternativa1("");
                setAlternativa2("");
                setAlternativa3("");
                setAlternativa4("");
                setImagem(null);
                console.log(novaPergunta);
            })
            .catch((error) => {
                alert("Selecione uma imagem válida.")
            });
    };

    useEffect(() => {
        console.log(questionario);
    }, [questionario])

    return (
        <div className="App">
            <Container fluid className="bg-light vh-100">
                <Row>
                    <Col className="col-md-10">
                        <Form className="d-flex vh-100 p-3 justify-content-center align-items-center">
                            <Row className="border rounded p-3 h-100 d-flex align-items-center justify-content-center py-3 m-0 gap-3 w-100 bg-white">
                                <Row className="gap-3 row d-flex align-items-center justify-content-center ">
                                    <Row>
                                        <span className="h1 text-center">Gerador de Questionário</span>
                                    </Row>
                                    <Row>
                                        <span className='text-muted text-center'>Após gerar o questionario, as respostas serão distribuidas aleatoriamente.</span>
                                    </Row>
                                    <Row>
                                        <Col className="col-md-11">
                                            <TextField label="Escreva a pergunta" fullWidth variant="outlined" value={pergunta} onChange={(e) => setPergunta(e.target.value)} />
                                        </Col>
                                        <Col className="col-md-1 d-flex align-items-center justify-content-center">
                                            <BiQuestionMark size={25} color="blue" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-md-11">
                                            <TextField label="a) Escreva uma alternativa correta" fullWidth variant="outlined" value={alternativa1} onChange={(e) => setAlternativa1(e.target.value)} />
                                        </Col>
                                        <Col className="col-md-1 d-flex align-items-center justify-content-center">
                                            <AiOutlineCheck size={25} color="green" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-md-11">
                                            <TextField label="b) Escreva uma alternativa incorreta" fullWidth variant="outlined" value={alternativa2} onChange={(e) => setAlternativa2(e.target.value)} />
                                        </Col>
                                        <Col className="col-md-1 d-flex align-items-center justify-content-center">
                                            <BiX size={25} color='red' />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-md-11">
                                            <TextField label="c) Escreva uma alternativa incorreta" fullWidth variant="outlined" value={alternativa3} onChange={(e) => setAlternativa3(e.target.value)} />
                                        </Col>
                                        <Col className="col-md-1 d-flex align-items-center justify-content-center">
                                            <BiX size={25} color='red' />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-md-11">
                                            <TextField label="d) Escreva uma alternativa incorreta" fullWidth variant="outlined" value={alternativa4} onChange={(e) => setAlternativa4(e.target.value)} />
                                        </Col>
                                        <Col className="col-md-1 d-flex align-items-center justify-content-center">
                                            <BiX size={25} color='red' />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-md-11">
                                            <Form.Control type="file" size="lg" onChange={(e) => setImagem(e.target.files[0])} />
                                        </Col>
                                        <Col className="col-md-1 d-flex align-items-center justify-content-center">
                                            Fundo
                                        </Col>
                                    </Row>
                                    <Row  >
                                        <Col className="col-md-11">
                                            <Button className="w-100 p-3" variant="success" onClick={adicionarPergunta}>Salvar pergunta</Button>{' '}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="col-md-11">
                                            <Button className="w-100 p-3" variant="primary" disabled={questionario.length === 0} onClick={() => { navigate('/mostrarQuestionario', { state: { questionario } }) }}>Iniciar questionario</Button>{' '}
                                        </Col>
                                    </Row>
                                </Row>
                            </Row>
                        </Form>
                    </Col>
                    <Col className="col-md-2 bg-white border ">
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Perguntas criadas
                                </ListSubheader>
                            }
                        >
                            {questionario.map((questao, index) => {
                                return (<>
                                    <ListItemButton key={index}>
                                        <ListItemIcon>
                                            <BiQuestionMark size={25} />
                                        </ListItemIcon>
                                        <ListItemText primary={questao.pergunta} />
                                    </ListItemButton>
                                    <Collapse in={true} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    <AiOutlineCheck />
                                                </ListItemIcon>
                                                <ListItemText primary={questao.alternativas[0]} />
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    <BiX />
                                                </ListItemIcon>
                                                <ListItemText primary={questao.alternativas[1]} />
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    <BiX />
                                                </ListItemIcon>
                                                <ListItemText primary={questao.alternativas[2]} />
                                            </ListItemButton>
                                            <ListItemButton sx={{ pl: 4 }}>
                                                <ListItemIcon>
                                                    <BiX />
                                                </ListItemIcon>
                                                <ListItemText primary={questao.alternativas[3]} />
                                            </ListItemButton>
                                        </List>
                                    </Collapse>
                                </>
                                );
                            })}
                        </List>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default NovoQuestionarioPage;
