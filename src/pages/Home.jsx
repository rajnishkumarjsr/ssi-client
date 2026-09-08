import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { courseCatalog, courseLinks } from '../data/courses';
import { getGeoLocation } from '../utils/getGeo.js';
import {ImageSlider} from '../components/ImageSlider.jsx'

export default function Home() {
  const [geoCountry, setGeoCountry] = useState('US');
  
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

  return (
    <main>
      <ImageSlider />
      <section className="hero">
        <div className="hero-content">
          <h1>Learn Without Limits</h1>
          <p>
            Access comprehensive test preparation programs, earn certificates, and
            achieve your academic goals with our expert-led courses.
          </p>
          {/* <div className="hero-buttons">
            <Link to="/programs" className="btn-primary">
              Explore Programs
            </Link>
            <a href="#features" className="btn-secondary">
              Learn More
            </a>
          </div> */}
        </div>
        <div className="hero-stats">
          <div className="stat">
            <h3>50K+</h3>
            <p>Students</p>
          </div>
          <div className="stat">
            <h3>4</h3>
            <p>Programs</p>
          </div>
          <div className="stat">
            <h3>100+</h3>
            <p>Instructors</p>
          </div>
        </div>
      </section>

      <section className="popular-courses">
        <h2>Popular Programs</h2>
        <div className="courses-grid">
          {courseCatalog.slice(0, 4).map((course) => {
            const ratingValue = course.rating?.split(' ')?.[0] ?? '';
            const studentsValue = course.rating?.match(/\(([^)]+)\)/)?.[1];

            return (
              <div className="course-card" key={course.id}>
                <div className="image-box">
                  {
                    courseLinks[course.name] ? (
                    <Link to={courseLinks[course.name]}>
                      <img src={course.icon} alt={course.name} />
                    </Link>
                  ) : (
                    <img src={course.icon} alt={course.name} />
                  )
                  /* <img src={course.icon} alt={course.name} /> */
                  }
                </div>
                <div className="course-info">
                  {
                    courseLinks[course.name] ? (
                      <h3>
                        <Link to={courseLinks[course.name]}>
                          {course.name}
                        </Link>
                      </h3>
                    ) : (
                      <h3>{course.name}</h3>
                    )
                  }
                  {/* <p className="couresHightligh">By Expert Faculty</p> */}
                  <p className="couresHightligh">{course.duration}</p>
                  <p className="couresHightligh">{course.highlight1}</p>
                  <p className="couresHightligh">{course.highlight2}</p>
                  <p className="couresHightligh">{course.highlight3}</p>
                  <p className="couresHightligh">{course.highlight4}</p>
                  <div className="course-meta">
                    <span className="rating">
                      <i className="fas fa-star"></i> {ratingValue}
                    </span>
                    <span className="students">
                      {studentsValue ? `${studentsValue} students` : course.duration}
                    </span>
                  </div>
                  {/* Price section - Start */}
                  {/* <div className="course-price"> */}
                    {/* {geoCountry === 'IN' */}
                      {/* ? '₹' + course.price.toLocaleString() */}
                      {/* : '$' + course.price_doller.toLocaleString()} */}
                    {/* {course.price?.toLocaleString('en-IN')} */}
                  {/* </div> */}
                  {/* Price section - End */}
                </div>
              </div>
            );
          })}
        
        </div>
        {/* <div className="view-all">
          <Link to="/programs" className="btn-outline">
            View All Programs
          </Link>
        </div> */}
      </section>

      <section id="features" className="features-section">
        <h2>Why Choose SSI Educational Services?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <i className="fas fa-video"></i>
            <h3>Video Lectures</h3>
            <p>High-quality video content from expert instructors</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-certificate"></i>
            <h3>Certificates</h3>
            <p>Earn industry-recognized certificates upon completion</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-users"></i>
            <h3>Community</h3>
            <p>Connect with peers and instructors in discussion forums</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-mobile-alt"></i>
            <h3>Mobile Learning</h3>
            <p>Learn on-the-go with our mobile-responsive platform</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-chart-line"></i>
            <h3>Progress Tracking</h3>
            <p>Monitor your learning progress with detailed analytics</p>
          </div>
          <div className="feature-card">
            <i className="fas fa-clock"></i>
            <h3>Flexible Schedule</h3>
            <p>Learn at your own pace, anytime, anywhere</p>
          </div>
        </div>
      </section>

      
    </main>
  );
}







