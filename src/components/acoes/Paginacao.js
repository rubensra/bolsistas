import React from 'react';
import { useState,useEffect } from 'react';
import { Pagination,Divider, Table, Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

const Paginacao = (props) => {

  const  url = 'http://restAPI:8080/bolsista';
  var tipo = props.tipo;
  const [listaTotalBolsistas, setListaTotalBolsistas ] = useState([]); //Vetor para receber os Ex-bolsistas da consulta ao banco
  const [paginaAtual, setPaginaAtual ] = useState(1);
  const [bolsistasPorPagina, setBolsistasPorPagina ] = useState(9);

  console.log("Tipo: ", tipo);

  useEffect(()=>{
    fetch(url+"?tipo="+tipo)
      .then(response => response.json())
      .then(data => setListaTotalBolsistas(data))
  },[tipo]);

 const maximoPaginas = Math.ceil(listaTotalBolsistas.length / bolsistasPorPagina);


  const numeroPaginas = [];
  for(let i = 1; i <= maximoPaginas; i++){

	numeroPaginas.push(i);

  }

  const indexUltimoGrupo = paginaAtual * bolsistasPorPagina;
  const indexPrimeiroGrupo = indexUltimoGrupo - bolsistasPorPagina;
  const listaAtualBolsistas = listaTotalBolsistas.slice(indexPrimeiroGrupo,indexUltimoGrupo);

  console.log("Lista Atual Bolsistas: ",listaAtualBolsistas);
  console.log("Lista Total dos Bolsistas: ",listaTotalBolsistas);
  console.log("Maximo de Paginas: ", maximoPaginas);
  function MudaPagina(page){
	  setPaginaAtual(page);
	  console.log("Numero da Pagina: ",page);
  }


  function TabelaExBolsistas(listaBolsistas){

    return(
      <Table className="centered striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-Mail</th>
              <th>Matricula</th>
            </tr>
          </thead>
        <tbody>
          {listaBolsistas.map(bolsista => {
            return(
              <tr key={bolsista["id"]}>
                <td><Link to={{ pathname: "/bolsistas/atualizar", state: { tipo: "atualizar", dadosBolsista: bolsista} }} className="exLinkes">{bolsista["nome"]}</Link></td>
                <td>{bolsista["email"]}</td>
                <td>{bolsista["matricula"]}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    )
  }

  return(

	  <div>
	  {TabelaExBolsistas(listaAtualBolsistas)}
	  <Divider />
	  <Pagination
	  activePage={ paginaAtual }
	  items={ bolsistasPorPagina }
	  leftBtn={<Icon>chevron_left</Icon>}
	  rightBtn={<Icon>chevron_right</Icon>}
	  onSelect = { MudaPagina  }

	/>
	</div>

  );

}

export default Paginacao;
