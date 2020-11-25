import React from 'react';
import Header from '../../components/Header';
import { Container, StatsRow } from 'react-bootstrap';

import ShortenerService from '../../services/shortenerService';

import {parseISO, formatRelative} from 'date-fns';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import ptBR from 'date-fns/locale//pt-BR';

class StatusPage extends React.Component{
  constructor(props){
    super(props);

    this.state={
      isLoading:false,
      shortenedURL:{},
      erroMessage:'',
    }
  }

  async componentDidMount(){
    const {code} = this.props.match.params;

    try{
      const service = new ShortenerService();
      const shortenedURL = await service.getStats(code);

      const parsedDate = parseISO(shotenedURL.updateAt);
      const currentDate = new Date();

      const relativeDate = formatRelative(parsesDate, currentDate, {
        locale:ptBR,
      });

      shortenedURL.relativeDate = relativeDate;



      this.setState({isLoading:false, shortenedURL})
    }catch(error){
      this.setState({isLoading:false, erroMessage:"Ops, url solicitada não encontrada."})
    }
  }

  render(){
    const {erroMessage, shortnedURL} = this.state;

    return(
      <Container>
        <Header>Estatisticas</Header>
        {erroMessage ? (
          <>
            <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle"/>
            <p className="m-3">{erroMessage}</p>
            <a className="btn btn-primary" href="/">Encurtador nova URL</a>
          </>
        ):(
          <>
            <p><b>https://localhost:3001/{shotenedURL.code}</b></p>
            <p>Redireciona para : <br/>{shortenedURL.code}</p>
            <StatsRow>
              <StatsBox>
                <b>{shortnedURL.hits}</b>
                <StatsBoxTitle>Visitas</StatsBoxTitle>
              </StatsBox>
              <StatsBox>
                <b>{shotenedURL.relativeDate}</b>
                <StatsBoxTitle>Últimas Visitas</StatsBoxTitle>
              </StatsBox>
            </StatsRow>
            <a className="btn btn-primary" href="/">encurtar nova URL</a>
          </>
        )}
      </Container>
    );
  }
}

export default StatusPage;