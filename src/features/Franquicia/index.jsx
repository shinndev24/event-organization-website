import './Franquicia.css';
import FranquiciaHero from './components/FranquiciaHero';
import FranquiciaOpportunity from './components/FranquiciaOpportunity';
import FranquiciaTestimonials from './components/FranquiciaTestimonials';
import FranquiciaContact from './components/FranquiciaContact';

export default function Franquicia() {
  return (
    <div className="franquicia-container">
      <FranquiciaHero />
      <FranquiciaOpportunity />
      <FranquiciaTestimonials />
      <FranquiciaContact />
    </div>
  );
}
