import React from 'react';
import {Container, InputGroup, FormGroup, Button, Alert, Spinner, ContentContainer} from 'react-bootstrap';

import Header from '../../components/Header';

import ShortnerService from '../../services/shortenerService';
 



class HomePage extends React.Component{
  constructor(props){
    super(props);

    this.state={
      isLoading:false,
      url:'',
      code:'',
      erroMessage:'',
    }
  }

  handleSubmit = async(event)=>{
    event.preventDefault();

    const { url} = this.state;

    this.setState({isLoading:true, erroMessage:''});

    if(!url){
      this.setState({isLoading:false, erroMessage:'informe uma URL par encurtar.'});
    }else{
      try{
        const servive = new ShortnerService();
        const result = await service.genereate({url});

        this.setState({isLoading:false, code: result.code})
      }catch(error){
        this.setState({isLoading:false, erroMessage:'Ops. erro ao encurtar a URL'});
      }
    }
  }

  copyToClipboard = () =>{
    const element = this.inputURL;
    element.select();
    document.execCommand('copy');
  }

  render(){
    const {isLoading, erroMessage, code} = this.state;
    return(
      <Container>
        <Header>Encurtador de URL</Header>
        <>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Digite para incurtar"
                defaltvalue=""
                onChange={e => this.setState({ ulr: e.target.value})}
              />
              <InputGroup.Append>
                <Button variant="primary" type="submit">Encurtar</Button>
              </InputGroup.Append>
            </InputGroup>

            {isLoading ? (
              <Spinner animation="border"/>
            ) : (
              code && (
                <>
                  <InputGroup className="mb-3">
                    <FormControl
                      autoFocus={true}
                      defaltvalue={`https://localhost.tk/${code}`}
                      ref={(input) => this.inputURL = input}
                    />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={()=>this.copyToClipboard()}>Encurtar</Button>
                    </InputGroup.Append>
                  </InputGroup>
              <p>Para acompanhar acesse  htts//:localhost.tk/{code}</p>
                </>
              )
            )}
            {erroMessage && <Alert variant="danger">{erroMessage}</Alert>}
          </Form>
        </>
      </Container>
    );
  }
}

export default HomePage