import React from 'react';
import styled from 'styled-components';

const Main = styled.main`
    background-color: #060210;
    width: 100vw;
    height:100vh;
    max-height:100%;
    position:relative;
`;

function Container(props) {
    return(
        <Main>
            {props.children}
        </Main>
    );
}

export default Container;