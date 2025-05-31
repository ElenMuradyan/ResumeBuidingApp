import Hero from '@/components/Hero';
import './globals.css';
import { LampDemo } from '@/components/Templates';
import { HeroHighlightDemo } from '@/components/HeroHighlightDemo';

export default function Home() {
  return (
    <>
   <HeroHighlightDemo className='h-[auto] w-[100%]'>
    <Hero />
    <LampDemo />
    </HeroHighlightDemo>
    </>
  );
}