import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    outline:0;
    box-sizing:border-box;
    font-family: 'Open Sans', sans-serif;
}
#root{
    margin:0 auto;
    --step--2: clamp(0.84rem, calc(0.63rem + 0.3vw), 0.69rem);
    --step--1: clamp(1.05rem, calc(0.74rem + 0.44vw), 0.83rem);
    --step-0: clamp(1rem, calc(0.87rem + 0.64vw), 1.31rem);
    --step-1: clamp(1.2rem, calc(1.02rem + 0.9vw), 1.64rem);
    --step-2: clamp(1.44rem, calc(1.19rem + 1.25vw), 2.05rem);
    --step-3: clamp(1.73rem, calc(1.39rem + 1.71vw), 2.56rem);
    --step-4: clamp(1.8rem, calc(1.61rem + 2.30vw), 2.70rem);
    --step-5: clamp(2.00rem, calc(1.87rem + 3.05vw), 3.1rem);
}
button{
    cursor:pointer;
}
h1 {
  font-size: var(--step-5);
}
h2 {
  font-size: var(--step-4);
}
h3 {
  font-size: var(--step-3);
}
h4 {
  font-size: var(--step-2);
}
h5 {
  font-size: var(--step-1);
}
p {
  font-size: var(--step-0);
}
`;

export default GlobalStyle;
