import React from 'react';

import Header from '../../components/Header';
import {Container} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import ShortenerService from '../../services/shortenerService';

class RedirecPage extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading:false,
      url:'',
      erroMessaege:'',
    }
  }

  async componentDidMount(){
    const {code} = this.props.match.params;

    try{
      const service = new ShortenerService();
      const {url} = await service.getLink(code);
      window.location = url;

    }catch(erro){
      this.setState({isLoading:false, erroMessaege:'Ops, Url não encontrada'});
    }
  }

  render(){
    const {erroMessaege} = this.state;
    return(
      <Container>
        {erroMessaege ? (
          <>
            <Header>
              Seu novo incurtador de links
            </Header>
            <StatsContainer className="text-center">
              <FontAwesomeIcon size="3x" color="#f8d4da" icon="exclamation-triangle"/>
              <p className="m-3">{erroMessaege}</p>
              <a className="btn btn-primary" href="/">Encurte uma nova URL</a>
            </StatsContainer>
          </>
        ):(
          <p>Redirecionando....</p>
        )}
      </Container>
    );
  }
}

export default RedirecPage;