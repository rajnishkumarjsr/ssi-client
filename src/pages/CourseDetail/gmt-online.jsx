import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getGeoLocation } from '../../utils/getGeo.js';
import { courseCatalog } from '../../data/courses.js';
//import { Link } from 'react-router-dom';

const featureMap = {
  gmat: [
    '65+ Hours: Live classroom strategy sessions',
    '6 Full-Length Mock Tests: Simulate actual GMAT exam conditions',
    '55 Adaptive Lessons & 44 Quick Review Lessons: Comprehensive GMAT practice',
    '30 myPlan Sessions: Personalized 1:1 doubt-solving and test reviews',
    '24/7 Support: Instant help via Telegram/WhatsApp',
    'Booster* Sessions: 10 hours of group learning + 5 hours of 1-on-1 coaching',
    '1-Year Portal Access: Includes concept revision lessons and practice tests',
    'Classroom Recordings: Access to session recordings for revision.'
  ]
};

export default function GmatOnline() {
  const [searchParams] = useSearchParams();
  const selectedCourseKey = searchParams.get('id') || '';
  const [geoCountry, setGeoCountry] = useState('US');
  const [activeTab, setActiveTab] = useState('online');

  const course = useMemo(() => {
    return (
      courseCatalog.find((item) => item.id === selectedCourseKey) ||
      courseCatalog.find((item) => item.id === 'gmat') ||
      null
    );
  }, [selectedCourseKey]);

  useEffect(() => {
    let isMounted = true;

    getGeoLocation()
      .then((data) => {
        if (isMounted) {
          setGeoCountry(data?.country || 'US');
        }
      })
      .catch(() => {
        if (isMounted) {
          setGeoCountry('US');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const priceText = course
    ? geoCountry === 'IN'
      ? `₹${course.price.toLocaleString()}`
      : `$${course.price_doller.toLocaleString()}`
    : 'Pricing available on request';

  const features = course?.id ? featureMap[course.id] : null;
  const tabContent = {
    online: {
      title: 'GMAT online',
      description:
        'The GMAT Online 2026 combines 65+ hours of live classroom instruction with personalized strategy sessions tailored to individual learning needs. Students gain access to The Princeton Review student portal, featuring concept revision videos, live interactions with US-based GMAT experts, and practice tests for flexible learning. The program includes essential resources like the TPR In-Class Manual, TPR Quant Review Book, TPR Verbal Review Book, Manya Additional Practice Material, and the latest GMAT Official Guide to ensure a well-rounded preparation experience.',
      image: '/images/GMAT.png',
      imageAlt: 'GMAT Online program'
    },
    selfLearning: {
      title: 'GMAT 2026',
      description:
        'Self Learning programs are primarily designed for aspirants who have already prepared for or taken an exam once, are aware of their strengths and weaknesses and are thus looking for programs to improve their competence on only one section of the test, say Verbal Ability or Quantitative Aptitude, rather than the whole test. These programs will start right from the basics of the particular section.',
      image: '/images/GMAT.png',
      imageAlt: 'GMAT Self Learning program'
    }
  };
  const currentTab = tabContent[activeTab];
  const showCourseDetails = activeTab === 'online';

  return (
    <main>
      <section className="course-detail">
        <div className="course-detail-tabs" role="tablist" aria-label="GMAT programs">
          <button
            type="button"
            className={`course-detail-tab ${activeTab === 'online' ? 'is-active' : ''}`}
            role="tab"
            id="gmat-online-tab"
            aria-selected={activeTab === 'online'}
            aria-controls="gmat-online-panel"
            onClick={() => setActiveTab('online')}
          >
            Online
          </button>
          <button
            type="button"
            className={`course-detail-tab ${activeTab === 'selfLearning' ? 'is-active' : ''}`}
            role="tab"
            id="gmat-self-learning-tab"
            aria-selected={activeTab === 'selfLearning'}
            aria-controls="gmat-self-learning-panel"
            onClick={() => setActiveTab('selfLearning')}
          >
            Self Learning
          </button>
        </div>
        <div className="course-detail-grid">
          <div className="course-detail-image">
            <img
              src={currentTab.image}
              alt={currentTab.imageAlt}
            />
          </div>
          <div className="course-detail-content">
            <div
              role="tabpanel"
              id="gmat-online-panel"
              aria-labelledby="gmat-online-tab"
              hidden={!showCourseDetails}
            >
              <h1>{tabContent.online.title}</h1>
              <hr className="course-detail-divider" />
              <p>{tabContent.online.description}</p>
            </div>
            <div
              role="tabpanel"
              id="gmat-self-learning-panel"
              aria-labelledby="gmat-self-learning-tab"
              hidden={showCourseDetails}
            >
              <h1>{tabContent.selfLearning.title}</h1>
              <hr className="course-detail-divider" />
              <p>{tabContent.selfLearning.description}</p>
            </div>
            {showCourseDetails && features?.length ? (
              <>
                <h2>Key Features:</h2>
                <ul className="course-detail-features">
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {showCourseDetails ? (
              <>
                <hr className="course-detail-divider-top" />
                <div className="course-detail-price">
                  {/* <span className="price-label">Price </span> */}
                    <span className="price-value">{priceText} /- </span>
                    {/* <span className="price-value">+ GST(18%): {Number(course.price) * 0.18}/- </span> */}
                </div>

                <Link className="btn-enroll" to={`/enroll?course=${course.id}&country=${geoCountry}`}>
                  Enroll Now
                </Link>
              </>
            ) : null}
            
          </div>
        </div>
      </section>
    </main>
  );
}
