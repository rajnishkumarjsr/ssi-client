import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getGeoLocation } from '../../utils/getGeo.js';
import { courseCatalog } from '../../data/courses.js';

const featureMap = {
  cat: [
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

export default function CatOnline() {
  const [searchParams] = useSearchParams();
  const selectedCourseKey = searchParams.get('id') || '';
  const [geoCountry, setGeoCountry] = useState('US');

  const course = useMemo(() => {
    return (
      courseCatalog.find((item) => item.id === selectedCourseKey) ||
      courseCatalog.find((item) => item.id === 'cat') ||
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
    course?.id === 'cat'
      ? 'Start your preparation with comprehensive programs for aspirants of MBA entrance tests such as CAT, XAT, TISS, MICAT, MH-CET, CMAT, GMAT, MAT, IBSAT & ATMA, Recruitment tests for Bank, SSC-CGL & Government exams, Campus Placements.'
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
              src={course?.icon?.startsWith('/') ? course.icon : '/images/CAT.png'}
              alt={course?.name || 'Course'}
            />
          </div>
          <div className="course-detail-content">
            <h1>{course?.name || 'CAT Online'}</h1>
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

            <Link
              className="btn-enroll"
              to={`/enroll?course=${course.id}&country=${geoCountry}`}
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
