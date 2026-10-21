import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(ScrollTrigger, CustomEase);

// The same curves as --ease-out / --ease-in-out in tokens.css
export const EASE_OUT = CustomEase.create('page-out', '0.23,1,0.32,1');
export const EASE_IN_OUT = CustomEase.create('page-in-out', '0.77,0,0.175,1');

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger };
