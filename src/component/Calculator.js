import React from "react";
import styled from "styled-components";
import "./styles/Calculator.css";

const Screen = styled.div`
  background-color: #070321;
  color: #ffae40;
  font-size: 2em;
  text-align: right;
  width: 320px;
  height: 100px;
`;

const Button = styled.button`
  color: #070321;
  font-size: 1.5em;
  width: 80px;
  height: 60px;
  border: 1px solid transparent;
`;

const ButtonOperator = styled(Button)`
  background-color: #ffae40;

  &:hover {
    background-color: #ffbb56;
  }
`;

const ButtonNumber = styled(Button)`
  background-color: #ddd;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const ButtonAC = styled(Button)`
  background-color: #070321;
  color: #fff;

  &:hover {
    background-color: #313654;
  }
`;

class Calculator extends React.Component {
  state = {
    screen: "",
    operation: [],
    result: 0,
  };

  buttonClicked = (e) => {
    this.setState({
      screen: `${this.state.screen + e.target.value}`,
      operation: [
        ...this.state.operation,
        /[\+\-\*\/]/.test(e.target.value)
          ? `,${e.target.value},`
          : e.target.value,
      ],
      result: 0,
    });

    console.log(this.state.operation);
  };

  removeValue = (e) => {
    if (this.state.result==0) {
      if (this.state.operation.length > 0) {
        this.setState({
          screen: this.state.screen.slice(0, -1),
          operation: this.state.operation.slice(0, -1),
        });
      }
    } else {
        console.log('removing all');
        this.setState({
            screen: "",
            operation: [],
            result: 0,
          });
    }
    console.log(this.state.operation);
  };

  resultOperation = (e) => {
    try {
      const operation = this.state.operation.join("").split(",");
      let res = 0;
      let i = 0;
      let current = parseFloat(operation[0]);
      console.log(operation);

      operation.forEach((it) => {
        console.log(`IT: ${it} and I: ${i}`);

        if (/[\+\-\*\/]/.test(it)) {
          if (i != 0 || i != operation.length - 1) {
            switch (it) {
              case "+":
                res = parseFloat(current) + parseFloat(operation[i + 1]);
                break;
              case "-":
                res = parseFloat(current) - parseFloat(operation[i + 1]);
                break;
              case "*":
                res = parseFloat(current) * parseFloat(operation[i + 1]);
                break;
              case "/":
                res = parseFloat(current) / parseFloat(operation[i + 1]);
                break;
            }
            current = parseFloat(res);
            console.log(`current: ${current}`);
          } else {
            throw new Error(
              "First or last element into the operation can't be an operator."
            );
          }
        }
        i++;
      });

      this.setState({
        screen: "",
        operation: [],
        result: res,
      });
    } catch (e) {
      console.error(
        `There's an error into the operation, check it out and try it again later: ${e}`
      );
    }
  };

  render() {
    return (
      <>
        <Screen>
          {this.state.result == 0 ? this.state.screen : this.state.result}
        </Screen>
        <div className="calc-buttons">
          <ButtonOperator onClick={this.buttonClicked} value="+">
            +
          </ButtonOperator>
          <ButtonOperator onClick={this.buttonClicked} value="-">
            -
          </ButtonOperator>
          <ButtonOperator onClick={this.buttonClicked} value="*">
            *
          </ButtonOperator>
          <ButtonOperator onClick={this.buttonClicked} value="/">
            /
          </ButtonOperator>
          <ButtonNumber onClick={this.buttonClicked} value="1">
            1
          </ButtonNumber>
          <ButtonNumber onClick={this.buttonClicked} value="2">
            2
          </ButtonNumber>
          <ButtonNumber onClick={this.buttonClicked} value="3">
            3
          </ButtonNumber>
          <ButtonNumber onClick={this.buttonClicked} value="4">
            4
          </ButtonNumber>
          <ButtonNumber onClick={this.buttonClicked} value="5">
            5
          </ButtonNumber>
          <ButtonNumber onClick={this.buttonClicked} value="6">
            6
          </ButtonNumber>
          <ButtonNumber onClick={this.buttonClicked} value="7">
            7
          </ButtonNumber>
          <ButtonNumber onClick={this.buttonClicked} value="8">
            8
          </ButtonNumber>
          <ButtonNumber onClick={this.buttonClicked} value="9">
            9
          </ButtonNumber>
          <ButtonNumber onClick={this.buttonClicked} value="0">
            0
          </ButtonNumber>
          <ButtonAC className="button-AC" onClick={this.removeValue} value="AC">
            AC
          </ButtonAC>
          <ButtonNumber onClick={this.buttonClicked} value=".">
            .
          </ButtonNumber>
          <ButtonOperator
            className="button-equal"
            onClick={this.resultOperation}
          >
            =
          </ButtonOperator>
        </div>
      </>
    );
  }
}

export default Calculator;
