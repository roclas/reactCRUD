import React from 'react';
import { NavLink } from 'react-router-dom';

class MyList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { els: [] };
  }

  componentDidMount() {
	fetch("http://localhost:4001/items", {method:'GET'})
		  .then(r=>r.json()).then(json=>this.setState({els:json}));
  }

  render(){
    let fields=["id"].concat([...Object.values(this.state.els).reduce((a,b)=>
	    [...Object.keys(b)].reduce((ac,c)=>ac.add(c),a)
    ,new Set())].filter(f=>f!=="id").sort());
    
    return (
       <div>
       <table className="table" id="deliveries">
        <thead className="thead-dark"><tr>
	  	{fields.map(f=> <th key={f} scope="col">[{f}]</th> )}
		<th scope="col"></th>
	    </tr>
        </thead>
	<tbody>
	  {Object.keys(this.state.els).map(id=>
	    <tr key={"tr_"+id}>
	    {fields.map(f=> <td key={id+f} scope="col">{this.state.els[id][f]}</td> )}
	    <td key={id+"_link"} ><NavLink to={"/detail/"+id}>Detail</NavLink></td>
            </tr>
          )}
	</tbody>
       </table>
       </div>
    );
  }

}

export default MyList;
