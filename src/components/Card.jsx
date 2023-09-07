import styled from 'styled-components'


export const Card = styled.div`
    background-color: ${props => props.bgcolor}30;

    &:hover {
        transition: transform 0.2s ease-in-out;
        background-color: ${props => props.bgcolor}40;
    }
    `

export const CardLink = styled.a`
    color: ${props => props.color}95;
    display: block;
    
    &:hover {
        transition: transform 0.2s ease-in-out;
        color: ${props => props.color};
    }
`