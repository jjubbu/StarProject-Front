import { createGlobalStyle } from "styled-components";
import { normalize } from "react-style-reset/string";

export const GlobalStyle = createGlobalStyle`

${normalize};
 
*{
    padding:0; 
    margin:0;
    box-sizing: border-box;
    list-style: none;
}

button{
    cursor: pointer;
}

html{
    width: 100%;
    height: 100vh;
    background-color: #18191E;
    color:white;
    overflow-X:hidden;
    body{
        width: 100%;
        height: 100%;  
        overflow-X:hidden;

        a{
            text-decoration: none;
            outline: none;
            color:white;
        }

        p{margin:0;}
    }
}

#root{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
}

.CommonPageStyle{
    width: 1200px;
    margin: 0 auto;
    flex:1;
    @media only screen and (max-width: 1200px) {
    width: 100%;
    padding: 0 20px;
  }
  
} 

.CommonGap{
    margin-bottom: 24px;
}

#card_container{
    height: 100%;
    display: flex;
    flex-direction: column;
}
`;
