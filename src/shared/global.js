import {createGlobalStyle} from "styled-components";
import {normalize} from 'react-style-reset/string';

export const GlobalStyle = createGlobalStyle `

${normalize};

*{padding:0; margin:0;box-sizing: border-box;}

html{
    width: 100%;
    height: 100%;

    body{
        width: 100%;
        height: 100%;  

        a{
            text-decoration: none;
            outline: none;
            color:#000;
        }

        p{margin:0;}
    }
}

#root{
    width: 100%;
    height: 100%;
    position: relative;
}
`
