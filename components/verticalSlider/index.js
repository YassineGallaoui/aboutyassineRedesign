import {useEffect} from "react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import Image from 'next/image'

const SingleSlide = function({index, src, alt, tot}) {
    return(
        <SplideSlide>
            <span>{index}/{tot}</span>
            <Image src={src} alt={alt}/>
        </SplideSlide>
    )
}

export default function VerticalSlider({ariaLabel, direction, slides}) {
    return (
        <Splide aria-label={ariaLabel} options={{
            direction: 'ttb',
            type   : 'loop',
            perPage: 1,
            focus  : 'center',
            drag   : 'free',
            snap   : true,
            width  : '600px',
            height : '50vh',
            gap    : '22em',
        }}>
            {slides.map((el, index) => <SingleSlide key={index} index={index+1} src={el.src} alt={el.alt} tot={slides.length}/>)}
        </Splide>
    )
}