import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//import CadastraBolsista from './CadastraBolsista';

//import FetchAPI from './FetchAPI';

const ExibeBolsistas = (props) => {

  //let  { tipo }  = props.tipo;
  const  url = 'http://restAPI:8080/bolsista';
  var tipo = props.tipo;

  const [bolsistasTurno, setBolsistasTurno] = useState({
    M: [],
    T: [],
    C: [],
    N: [],
    S: []
  });
  //var turno = {'M':'07:15 as 11:15', 'T':'11:15 as 15:15', 'C':'15:15 as 19:15', 'N': '18:40 as 22:40', 'S': '08:00 as 18:00'}
  var turnoBolsa = {'M':'Manha de 07:15 as 11:15', 'T':'Manha/Tarde de 11:15 as 15:15', 'C':'Tarde/Noite de 15:15 as 19:15', 'N': 'Noite de 18:40 as 22:40', 'S': 'Sabado de 08:00 as 18:00'}
  console.log("Tipo: ", tipo);

  useEffect(()=>{
    fetch(url+"?tipo="+tipo)
      .then(response => response.json())
      .then(data => UpdateBolsistas(data))
  },[tipo]);

  /* -- Funcao para Separar os Bolsistas em seus Turnos -- */
  function UpdateBolsistas(dados){
    console.log("Lista total dos Bolsistas: ",dados);
    /*  Arrays locais dos Turnos */
    var manha = [];
    var manhaTarde = [];
    var tardeNoite = [];
    var noite = [];
    var sabado = [];
    /* Seprando por turno em cada array Local */
    dados.map(bolsista => {
      switch(bolsista.turno) {
        case 'M':
          manha.push(bolsista);
          break;
        case 'T':
          manhaTarde.push(bolsista);
          break;
        case 'C':
          tardeNoite.push(bolsista);
          break;
        case 'N':
          noite.push(bolsista);
          break;
        case 'S':
          sabado.push(bolsista);
          break;
        default:
          break;
      }
    })

    /* A funcao setBolsistasTurno recebe como parametro a imagem previa do array Total
      dos turnos, em uma especie de arrow function em que ela vai receber novamente
      a imagem original, e atualizar depois da ','(virgula) somente a "chave"
      necessária.

      Exemplo: setState(prevState => ({...prevState, [chave]:valor}))

    */
    setBolsistasTurno(bolsistasTurno => ({...bolsistasTurno,['M']:manha}));
    setBolsistasTurno(bolsistasTurno => ({...bolsistasTurno,['T']:manhaTarde}));
    setBolsistasTurno(bolsistasTurno => ({...bolsistasTurno,['C']:tardeNoite}));
    setBolsistasTurno(bolsistasTurno => ({...bolsistasTurno,['N']:noite}));
    setBolsistasTurno(bolsistasTurno => ({...bolsistasTurno,['S']:sabado}));
  }

  /* -- Funcao para exibir os bolsistas -- */
  function TabelaBolsistas(){
    return(
      <table>
        {/* Criar tabela e mapear os turnos para aprensentar os bolsitas por turno */
          Object.keys(turnoBolsa).map(turno => {
          return(
          <tbody>
          <tr>
            <th class="cabecalhoBolsista" colspan="3">{turnoBolsa[turno]}</th>
          </tr>
          <tr>
            <th>Nome</th>
            <th>E-Mail</th>
            <th>Matricula</th>
          </tr>
          {/* mapear e apresentar os bolsistas pelo turno */
            bolsistasTurno[turno].map((bolsista) =>{
            return(
              <tr key={bolsista["id"]}>
                <td><Link to={{ pathname: "/bolsistas/atualizar", state: { tipo: "atualizar", dadosBolsista: bolsista} }} className="linkes">{bolsista["nome"]}</Link></td>
                <td>{bolsista["email"]}</td>
                <td>{bolsista["matricula"]}</td>
              </tr>
            )
          })
          }
          </tbody>
        )
        })}
      </table>
    )
  }


  /*console.log("Lista bolsistas: ", listaBolsistas);
  console.log("Bolsistas Noite: ",bolsistasTurno.N);
  console.log("Bolsistas Sabado: ", bolsistasTurno.S);*/
  return(
    TabelaBolsistas()
  );
}

export default ExibeBolsistas;
