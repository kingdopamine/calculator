import React from 'react'

import './Calculator.css'

let i = 0; // this counter is for indicating how many levels deep the array needs to be denested


let ans;
let ans2;

class Calculator extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {matharr:[ans],currentNum:[ans2]}
    this.calculation=this.calculation.bind(this)
    this.decimal=this.decimal.bind(this)
    this.clear=this.clear.bind(this)
    this.allNumbers=this.allNumbers.bind(this)
    this.operators=this.operators.bind(this)

    document.addEventListener("keydown", event =>{
      if(event.key==="1"){
        return this.allNumbers("1")
      }
      if(event.key==="2"){
        return this.allNumbers("2")
      }
      if(event.key==="3"){
        return this.allNumbers("3")
      }
      if(event.key==="4"){
        return this.allNumbers("4")
      }
      if(event.key==="5"){
        return this.allNumbers("5")
      }
      if(event.key==="6"){
        return this.allNumbers("6")
      }
      if(event.key==="7"){
        return this.allNumbers("7")
      }
      if(event.key==="8"){
        return this.allNumbers("8")
      }
      if(event.key==="9"){
        return this.allNumbers("9")
      }
      if(event.key==="0"){
        return this.allNumbers("0")
      }
      if(event.key==="."){
        return this.decimal
      }
      if(event.key==="/"){
        return this.operators("/")
      }
      if(event.key==="*"){
        return this.operators("*")
      }
      if(event.key==="-"){
        return this.operators("-")
      }
      if(event.key==="+"){
        return this.operators("+")
      }
      if(event.which===8){
        return this.clear()
      }
      if(event.key==="="){
        return this.calculation()
      }
      if(event.which===13){
        return this.calculation()
      }
    })

  }
   
  calculation(){ 
    
    let calcArr = this.state.matharr.flat(i);
    let calcString = calcArr.join("");
    ans = eval(calcString);
    this.setState({matharr:[this.state.matharr,"=",ans],currentNum:[ans]});
    
  }
  
  
  allNumbers(num){
    
    if(this.state.currentNum=="/" || this.state.currentNum=="*" || this.state.currentNum=="+" || this.state.currentNum=="-"  ){
      if(ans!==undefined){
      ans=undefined;
      this.setState({matharr:[num],currentNum:[num]});
      i=0
    } else {
    i++; 
    this.setState({matharr:[this.state.matharr,num], currentNum:[num]})
    }
   } else {
     if(ans!==undefined){
      ans=undefined;
      this.setState({matharr:[num],currentNum:[num]});
      i=0
    } else {
    i++; 
      
     
      if(this.state.currentNum=="0"){this.setState({matharr:[this.state.matharr,num], currentNum:[num]})} else {this.setState({matharr:[this.state.matharr,num], currentNum:[this.state.currentNum,num]})}
    }
   }
  }  
  
  decimal(){
    
     if(!this.state.currentNum.flat(i).includes(".")  ){
    if(ans!==undefined){
      ans=undefined;
      this.setState({matharr:["0."],currentNum:["0."]});
      i=0
    } else if(this.state.matharr == ""){
      this.setState({matharr:["0."],currentNum:["0."]});
      
    } else {
    i++; 
      
      
      if(this.state.currentNum.flat(i).includes("0.")){}
      
    else {this.setState({matharr:[this.state.matharr,"."], currentNum:[this.state.currentNum,"."]}) }
      
      
    }
     
     
     }
  }
  
  
  operators(sym){
   

    // most of this is for dealing with negative numbers
     if(this.state.matharr[1]=="+" || this.state.matharr[1]=="/" || this.state.matharr[1]=="*" ){// this did not include minus because we do not want to append a minus symbol to a minus symbol
        
        if(sym=="-"){//this appends the minus symbol to the other symbols
          this.setState({matharr:[this.state.matharr,sym],currentNum:[sym]})
          
        }
          else {//this replaces the last symbol with the new symbol
      this.setState({matharr:[this.state.matharr[0],sym],currentNum:[sym]})};
      
      //this ensures if an appended minus is changed, both it, and the symbol before will be replaced by the new symbol
      } else if(this.state.matharr[1]=="-" ){
        if(this.state.matharr.flat()[1]=="+" || this.state.matharr.flat()[1]=="*" || this.state.matharr.flat()[1]=="/"){
          this.setState({matharr:[this.state.matharr.flat()[0],sym],currentNum:[sym]})
        } else {
        
        //this ensures minus is always replaced by another symbol
        this.setState({matharr:[this.state.matharr[0],sym],currentNum:[sym]})}}
    
    
    else {
      // the more common adding symbols to end of the equation, including after equals
      if(ans===undefined){
      i++;
    this.setState({matharr:[this.state.matharr,sym],currentNum:[sym]})
    } else {
    this.setState({matharr:[ans,sym],currentNum:[sym]});
      ans=undefined
    }
      
   }
    
  }
  
  clear(){
    this.setState({matharr:[],currentNum:["0"]});
     ans=undefined
  }
  
  
  
  render(){
   console.log(this.state.currentNum.flat(10));
    
    return(
      <div>
        <div id="calculators">
          <div id="display1">{this.state.matharr}</div>
          <div id="display">{this.state.currentNum}</div>
          <div id="clear" onClick={this.clear}>AC</div>
          <div id="divide" className="operator" onClick={()=>this.operators("/")}>/</div>
          <div id="multiply" className="operator" onClick={()=>this.operators("*")}>*</div>
          <div id="seven" className="numbers" onClick={()=>this.allNumbers("7")}>7</div>
          <div id="eight" className="numbers" onClick={()=>this.allNumbers("8")}>8</div>
          <div id="nine" className="numbers" onClick={()=>this.allNumbers("9")}>9</div>
          <div id="subtract" className="operator" onClick={()=>this.operators("-")}>-</div>
          <div id="four" className="numbers" onClick={()=>this.allNumbers("4")}>4</div>
          <div id="five" className="numbers" onClick={()=>this.allNumbers("5")}>5</div>
          <div id="six" className="numbers" onClick={()=>this.allNumbers("6")}>6</div>
          <div id="add" className="operator" onClick={()=>this.operators("+")}>+</div>
          <div id="one" className="numbers" onClick={()=>this.allNumbers("1")}>1</div>
          <div id="two" className="numbers" onClick={()=>this.allNumbers("2")}>2</div>
          <div id="three" className="numbers" onClick={()=>this.allNumbers("3")}>3</div>
          <div id="equals" onClick={this.calculation}>=</div>
          <div id="zero" onClick={()=>this.allNumbers("0")}>0</div> 
          <div id="decimal" className="numbers" onClick={this.decimal}>.</div>
        </div>
      </div>
    )
  
  } 
}

export default Calculator