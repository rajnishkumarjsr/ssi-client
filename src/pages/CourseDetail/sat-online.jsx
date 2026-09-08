import { useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getGeoLocation } from '../../utils/getGeo.js';
import { courseCatalog } from '../../data/courses.js';
//import { Link } from 'react-router-dom';

const featureMap = {
  sat: [
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

export default function SatOnline() {
  const [searchParams] = useSearchParams();
  const selectedCourseKey = searchParams.get('id') || '';
  const [geoCountry, setGeoCountry] = useState('US');

  const course = useMemo(() => {
    return (
      courseCatalog.find((item) => item.id === selectedCourseKey) ||
      courseCatalog.find((item) => item.id === 'sat') ||
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

  const description =
    course?.id === 'sat'
      ? 'The GMAT Online 2026 offers 75+ hours of live sessions, 6 full-length adaptive mock tests, and a comprehensive set of 55 adaptive lessons and 44 quick review lessons. The program combines expert-led teaching with 24/7 support, ensuring mastery of Quant, Verbal, and Data Insights sections.'
      : course?.description ||
        'Prepare with expert-led sessions, structured practice, and flexible learning support.';

  const priceText = course
    ? geoCountry === 'IN'
      ? `₹${course.price.toLocaleString()}`
      : `$${course.price_doller.toLocaleString()}`
    : 'Pricing available on request';

  const features = course?.id ? featureMap[course.id] : null;

  return (
    <main>
      <section className="course-detail">
        <div className="course-detail-grid">
          <div className="course-detail-image">
            <img
              src={course?.icon?.startsWith('/') ? course.icon : '/images/SAT.png'}
              alt={course?.name || 'Course'}
            />
          </div>
          <div className="course-detail-content">
            
            <h1>{course?.name || 'SAT Online'}</h1>
            <hr className="course-detail-divider" />
            <p>{description}</p>
            {features?.length ? (
              <>
                <h2>Key Features:</h2>
                <ul className="course-detail-features">
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </>
            ) : null}
            <hr className="course-detail-divider-top" />
            <div className="course-detail-price">
              {/* <span className="price-label">Price </span> */}
                <span className="price-value">{priceText} /- </span>
                {/* <span className="price-value">+ GST(18%): {Number(course.price) * 0.18}/- </span> */}
            </div>

            <Link className="btn-enroll" to={`/enroll?course=${course.id}&country=${geoCountry}`}>
              Enroll Now
            </Link>
            
          </div>
        </div>
      </section>
    </main>
  );
}


