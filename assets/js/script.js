

function NavButton(props){
	
	return (
		<li 
			className = {props.buttons}
			onClick = {props.onClick}
		>	
			<i 
				className = {props.iconclass}
			/>
			<span>
				{props.value}
			</span>
		</li>
	);
}

class NavMenu extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      buttons : Array('active', null, null, null),
      values : Array('Skills', 'Education', 'Experience', 'Other Experience'),
      iconclass : Array('fas fa-laptop-code', 'fas fa-graduation-cap', 'fas fa-clipboard-list', 'fas fa-clipboard-check')
    };
  }
  handleClick(i){
    const buttons = Array(4).fill(null);
    buttons[i] = 'active';
    const value = this.state.values[i];
    var nval = value.replace(' ', '');
    jQuery.getJSON( './assets/data/'+nval+'.json', function(data){
	jQuery('#cvContent').html('').append('<div id="cvItem">'+data.title+'</div>');
	jQuery.each(data.items, function(k, v){
		jQuery('#cvItem').append('<div class="item">'+v.title+v.content+'</div>');
	});
	
    });

    
    this.setState({
      buttons : buttons,
      
    });
  }
  
  renderButton(i) {
    return (
      <NavButton 
	buttons={this.state.buttons[i]}
        value={this.state.values[i]}
        iconclass={this.state.iconclass[i]}
        onClick={() => this.handleClick(i)}
       />
     );
  }

  render() {
    return (
      <ul id="nav">
          {this.renderButton(0)}
          {this.renderButton(1)}
          {this.renderButton(2)}
	  {this.renderButton(3)}
        
      </ul>
    );
  }
}


// ========================================

ReactDOM.render(
  <NavMenu />,
  document.getElementById('navigation')
);



