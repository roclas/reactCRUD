import React from 'react';
import axios from 'axios';
import {Button, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Notification=(props)=><div style={props.s} className={props.c}>{props.text}</div>;

class MyDetail extends React.Component {

  constructor(props) {
    super(props);
    console.log("constructor props",props);
    this.state = { el: {},alert:"",alertclass:"" };
  }

  componentDidMount() {
	let url=`http://localhost:4001/items/${this.props.match.params.id}`;
	fetch(url, {method:'GET'}).then(response => response.json())
        .then(json => this.setState({el:json}));
  }

  handleChange=event=>{
    let newEl={...this.state.el};
    newEl[event.target.name]=event.target.value;
    console.log("new object",JSON.stringify(newEl));
    this.setState({el:newEl});
  }

  handleSubmit=event=>{
    	event.preventDefault();
	let url=`http://localhost:4001/items/${this.props.match.params.id}`;
	axios({
        	method: 'put',
        	url: url,
        	data: this.state.el,
        	config: { headers: {'Content-Type': 'application/json' }}
      	}).then(json => { this.setState({...this.state.el
			,alert:"yes!!"
			,alertclass:"alert alert-success"
		});
		setTimeout(()=>this.setState({...this.state.el,alert:"",alertclass:""}),3000)
	});
  }

  render(){
    let el=this.state.el;
    return (
       <div>
        <h1>Detail #{el.id}</h1>
	<Notification text={this.state.alert} s={{textAlign:'center'}} c={this.state.alertclass} />
	    <form onSubmit={this.handleSubmit}>
	    <Container><Row>
	    {Object.entries(el).filter(e=>e[0]!="id").map(e => 
		    <Col key={e[0]} lg={6} sm={6} md={6}> {e[0]} <input name={e[0]} defaultValue={e[1]} onChange={this.handleChange} /> </Col>
	    )}
	    </Row>
	    </Container>
	    <br />
	      <Button variant="primary" size="lg" type="submit" block>
    		Submit!
  	      </Button>
	    </form>
       </div>
    );
  }

}

export default MyDetail;
