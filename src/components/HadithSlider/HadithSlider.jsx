
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// eslint-disable-next-line react/prop-types
const HadidthSlider = ({ slides = [] }) => {
  return (
    <Carousel
      autoPlay
      interval={3100}
      infiniteLoop
      showStatus={false}
      statusFormatter={(current, total) => (
        <span className="text-blue-500">
          {current} of {total}
        </span>
      )}
    >
      {slides.map((slide, index) => (
        <div key={index} className="hadith-card flex justify-center items-center mt-2">
          <div className="rounded-lg border border-blue-500 w-[95%] lg:w-[90%] px-4 bg-white">
            <h3 className="text-sm md:text-md lg:text-xl pt-8">{slide.text}</h3>
            <h4 className="text-sm pt-2 pb-4 text-blue-500">{slide.ref}</h4>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default HadidthSlider;
