
import styled from 'styled-components';


export const NavButtonWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    border: none;
`

export const OverlayWrapper = styled.div`
    position: absolute;
    width: 300px;
    max-height: 600px;
    background-color: white;
    overflow-y: auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    right: -20px;
    top: 55px;
    color: black;
`
