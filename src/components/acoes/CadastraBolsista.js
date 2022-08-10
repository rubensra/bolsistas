import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Row, Col, Select, Button, TextInput, Icon } from 'react-materialize';

const CadastraBolsista = (props) => {

  var tipo = props.location.state.tipo;
  //const { tipo } = useParams();
  //const { dados } = useParams();
  //const [url, setUrl] = useState([]);

  const url = 'http://restApi:8080/bolsista';
  //var metodo = "";

  //var valorInicial = "";
  const [postId, setPostId] = useState([]);
  const [valorInicial, setValorInicial] = useState([]);
  const [bolsista, setBolsista] = useState([]);
  let history = useHistory();

  useEffect(()=> {
    if (tipo === "cadastro"){
      var valorInicial = {
        nome: "",
        matricula: "",
        email: "",
        telefone: "",
        celular: "",
        tipo: "Bolsista",
        turno: "M",
        dataInicio: "",
        dataFim: ""
      }
      setValorInicial(valorInicial);
    } else {
      var valorInicial = {
        id: props.location.state.dadosBolsista["id"],
        nome: props.location.state.dadosBolsista["nome"],
        matricula: props.location.state.dadosBolsista["matricula"],
        email: props.location.state.dadosBolsista["email"],
        telefone: props.location.state.dadosBolsista["tel"],
        celular: props.location.state.dadosBolsista["cel"],
        tipo: props.location.state.dadosBolsista["tipo"],
        turno: props.location.state.dadosBolsista["turno"],
        dataInicio: props.location.state.dadosBolsista["data1"],
        dataFim: props.location.state.dadosBolsista["data2"]
      }
      setValorInicial(valorInicial);
    }
    setBolsista(valorInicial);
  },[tipo]);

  //valorInicial = props.location.state.dadosBolsista;
  //const [bolsista, setBolsista] = useState(valorInicial);

  console.log("Tipo da Pagina: ",tipo);
  console.log("Valor Inicial: ",bolsista);

  var turnoBolsista = {'M':'Manha de 07:15 as 11:15', 'T':'Manha/Tarde de 11:15 as 15:15', 'C':'Tarde/Noite de 15:15 as 19:15', 'N': 'Noite de 18:40 as 22:40', 'S': 'Sabado de 08:00 as 18:00'}
  var tipoBolsista = ['Bolsista', 'Ex-Bolsista', 'Voluntario', 'Ex-Voluntario']

  function onChangeHandler(e){
    const newBolsista = {...bolsista}
    newBolsista[e.target.id] = e.target.value;
    setBolsista(newBolsista);
    console.log("Alterou: ",newBolsista[e.target.id]);
    console.log("Alteracoes: ",newBolsista);
  }

  function onDelete(event,bolsista){
    event.preventDefault();
    //window.alert("Deseja Remover o Bolsista!?");
    //window.confirm(JSON.stringify(bolsista));
    var mensagem = "REMOVER REGISTRO: "+JSON.stringify(bolsista);
    var resultado = window.confirm(mensagem);
    if( resultado ){
      fetch(url+'/'+bolsista.id,{ method: 'DELETE' })
        .then(response => {
          if(response.status === 200){
            console.log("Resposta do servidor: ", response);
            window.alert("Registro Removido!");
            history.goBack();
          }
        })
        .catch(error => {
          console.error('Error: ', error);
        })
    }
    //history.goBack();
  }

  function resetData(){
    setBolsista(valorInicial);
    //window.location.reload();
  }


  function onSubmitHandler(event,bolsista){
    event.preventDefault();

    if(tipo === 'cadastro'){
      //console.log("Novo Bolsista:",bolsista);
      const requestOptions = ({
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nome: bolsista.nome, matricula: bolsista.matricula, email: bolsista.email, tel: bolsista.telefone, cel: bolsista.celular, tipo: bolsista.tipo, turno: bolsista.turno, data1: bolsista.dataInicio, data2: bolsista.dataFim})
      });
      fetch(url,requestOptions)
        .then(response => {
          if(response.status === 200){
            console.log("Resposta do servidor: ", response);
            resetData();
            window.location.reload();
          }
        })
        .catch(error => {
          console.error('Error: ', error);
        });

    } else {
        //console.log("Alteracao de Bolsista: ", bolsista);
        const requestOptions = ({
          method: 'PUT',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({id: bolsista.id, nome: bolsista.nome, matricula: bolsista.matricula, email: bolsista.email, tel: bolsista.telefone, cel: bolsista.celular, tipo: bolsista.tipo, turno: bolsista.turno, data1: bolsista.dataInicio, data2: bolsista.dataFim})
        });
        fetch(url+'/'+bolsista.id,requestOptions)
          .then(response => {
            if(response.status === 200){
              console.log("Resposta do servidor: ", response);
            }
          })
          .catch(error => {
            console.error('Error: ', error);
          })
        history.goBack();
    }

  }

  return(
  //  <div>
      <form className="grey darken-2">

        <Row>
          <Col m={10} s={10}>
            <TextInput icon={<Icon>person</Icon>} type="text" id="nome" value={bolsista.nome} placeholder="Nome Completo" onChange={(e) => onChangeHandler(e)}/>
          </Col>
        </Row>
        <Row>
          <Col m={3} s={3}>
            <TextInput icon={<Icon>account_circle</Icon>} type="text" id="matricula" value={bolsista.matricula} placeholder="Matricula" onChange={(e) => onChangeHandler(e)} />
          </Col>
          <Col m={5} s={5}>
            <TextInput icon={<Icon>email</Icon>} type="text" id="email" value={bolsista.email} placeholder="E-Mail" onChange={(e) => onChangeHandler(e)}/>
          </Col>
        </Row>
        <Row>
          <Col m={4} s={4}>
            <TextInput icon={<Icon>phone</Icon>} type="text" id="telefone" value={bolsista.telefone} placeholder="Telefone" onChange={(e) => onChangeHandler(e)}/>
          </Col>
          <Col m={4} s={4}>
            <TextInput icon={<Icon>phone_android</Icon>} type="text" id="celular" value={bolsista.celular} placeholder="Celular" onChange={(e) => onChangeHandler(e)}/>
          </Col>
        </Row>
        <Row>
          <Col m={4} s={4}>
            <Select id="tipo" onChange={(e) => onChangeHandler(e)} value={bolsista.tipo}>
              {tipoBolsista.map(tipo => {
                if(tipo === bolsista.tipo){
                  return(
                    <option selected value={tipo}>{tipoBolsista[tipo]}</option>
                  )
                } else {
                  return(
                    <option value={tipo}>{tipo}</option>
                  )
                }
              })
            }
            </Select>
          </Col>
          <Col m={6} s={6}>
          <Select id="turno" onChange={(e) => onChangeHandler(e)} value={bolsista.turno}>
            {Object.keys(turnoBolsista).map(turno => {
              if(turno === bolsista.turno){
                return(
                  <option selected value={turno}>{turnoBolsista[turno]}</option>
                )
              }else{
              return(
                <option value={turno}>{turnoBolsista[turno]}</option>
              )}
            })
          }
          </Select>
          </Col>
        </Row>
        <Row>
          <Col m={1} s={1}>
            <h5>Inicio:  </h5>
          </Col>
          <Col m={3} s={3}>
            <input id="dataInicio" value={bolsista.dataInicio} type="date" onChange={(e) => onChangeHandler(e)}/>
          </Col>
          <Col m={1} s={1}>
            <h5>Fim:  </h5>
          </Col>
          <Col m={3} s={3}>
            <input id="dataFim" value={bolsista.dataFim} type="date" onChange={(e) => onChangeHandler(e)}/>
          </Col>
        </Row>
        <Row>
          <Col m={2} s={2}>
            <Button className="light-blue accent3" onClick={(e) => onSubmitHandler(e,bolsista)}>{tipo === 'cadastro' ? 'Cadastrar' : 'Atualizar'}</Button>
          </Col>
          <Col m={2} s={2}>
            { tipo !== 'cadastro' && <Button className="light-blue accent3" onClick={(e)=>{onDelete(e,bolsista)}}>Deletar</Button> }
          </Col>
        </Row>
      </form>
  //  </div>

  );
}

export default CadastraBolsista;
