import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import './Roboto.css';

export default createGlobalStyle`

*{
  margin : 0;
  padding : 0;
  outline : 0;
  box-sizing : border-box;
}

*:focus{
  outline : 0;
}

html,body,#root{
  height : 100%;
  min-height : 100%;
}
body{
  -webkit-font-smoothing: antialiased !important;
}
body,input,button{
  font-size : 14px;
  font-family: 'Roboto', sans-serif;
}

a{
  text-decoration : none;
}

ul{
  list-style : none;
}

button{
  cursor: pointer;
}
`;
