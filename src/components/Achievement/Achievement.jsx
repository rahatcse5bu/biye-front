import { useContext } from 'react';
import BioContext from '../../contexts/BioContext';
import GridQuestionAnswerCard from '../GridQuestionAnswerCard/GridQuestionAnswerCard';
import { Colors } from '../../constants/colors';

const Achievement = () => {
  const { bio } = useContext(BioContext);
  const achievements = bio?.achievement?.achievements || [];

  if (!achievements.length) return null;

  return (
    <div className="single-bio-achievement rounded shadow">
      <h5 className="card-title text-center text-2xl my-3">অর্জন ও কৃতিত্ব</h5>

      <div
        className="px-4 py-3 text-center text-white font-semibold"
        style={{ backgroundColor: Colors.primary900 }}
      >
        অর্জনসমূহ
      </div>

      {achievements.map((item, index) => (
        <div key={index} className="grid grid-cols-1 gap-0">
          <GridQuestionAnswerCard question="শিরোনাম" answer={item.title} />
          {item.year && (
            <GridQuestionAnswerCard question="সাল" answer={item.year} />
          )}
          {item.description && (
            <GridQuestionAnswerCard question="বিবরণ" answer={item.description} />
          )}
          {index < achievements.length - 1 && (
            <div className="md:col-span-2 border-b-2 border-gray-300 my-1" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Achievement;
