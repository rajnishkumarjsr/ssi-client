import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { courseCatalog, courseLinks } from '../data/courses.js';
import { getGeoLocation } from '../utils/getGeo.js';



const coursesURL = 'https://oqbptm5xbl.execute-api.us-east-1.amazonaws.com/prod/courses';
const apiKey = '08FLFuexFsWfnFj6uTVjaCZsq4GHfgN7zTA2BG36';

//export default async function Courses() {
export default function Courses() {  
  const [category, setCategory] = useState('');
  const [level, setLevel] = useState('');
  const [search, setSearch] = useState('');
  const [geoCountry, setGeoCountry] = useState('US');
  const [courses, setCourses] = useState([]);

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


  useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("https://oqbptm5xbl.execute-api.us-east-1.amazonaws.com/prod/courses", {
      method: "GET",
      headers: {
        "X-Api-Key": "08FLFuexFsWfnFj6uTVjaCZsq4GHfgN7zTA2BG36",
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    setCourses(data.courses);
  };

  fetchData();
}, []);




const filteredCourses = useMemo(() => {
  const term = search.trim().toLowerCase();

  return courses.filter((course) => {
    const matchesCategory = !category || course.category === category;
    const matchesLevel = !level || course.level === level;
    const matchesSearch =
      !term ||
      course.name.toLowerCase().includes(term) ||
      course.description.toLowerCase().includes(term);

    return matchesCategory && matchesLevel && matchesSearch;
  });
}, [courses, category, level, search]);


  // const filteredCourses = useMemo(() => {
  //   const term = search.trim().toLowerCase();
  //   //return courseCatalog_1.filter((course) => {
  //   return courses.map((course) => {
  //     const matchesCategory = !category || course.category === category;
  //     const matchesLevel = !level || course.level === level;
  //     const matchesSearch =
  //       !term ||
  //       course.name.toLowerCase().includes(term) ||
  //       course.description.toLowerCase().includes(term);
  //     return matchesCategory && matchesLevel && matchesSearch;
  //   });
  // }, [category, level, search]);

//   const courseLinks = {
//   "GMAT Preparation": "/gmt-online",
//   "GRE Preparation": "/gre-online",
//   "SAT Preparation": "/sat-online",
//   "CAT Preparation": "/cat-online",
//   "IELTS Preparation": "/ielts-online",
//   "TOEFL Preparation": "/tofl-online"
// };

  return (
    <main>
      <section className="course-catalog">
        <div className="dashboard-header">
          <h1>Program Catalog</h1>
          <p>Discover our comprehensive test preparation programs</p>
        </div>

        <div className="course-filters">
          <div className="filter-group">
            <select
              id="categoryFilter"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">All Programs</option>
              <option value="graduate">Graduate Programs</option>
              <option value="undergraduate">Undergraduate Programs</option>
              <option value="english">English Proficiency</option>
            </select>

            <select
              id="levelFilter"
              value={level}
              onChange={(event) => setLevel(event.target.value)}
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <input
              type="text"
              id="searchInput"
              placeholder="Search programs..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="courses-grid" id="coursesGrid">
          {filteredCourses.map((course) => (
            <div
              className="course-card"
              key={course.id}
              data-category={course.category}
              data-level={course.level}
            >
              <div className="image-box">
                {
                  courseLinks[course.name] ? (
                    <Link to={courseLinks[course.name]}>
                      <img src={course.icon} alt={course.name} />
                    </Link>
                  ) : (
                    <img src={course.icon} alt={course.name} />
                  )
                }
              </div>

              <div className="course-info">
                <span className="course-category">{course.categoryLabel}</span>
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
                
                <p className="instructor">By Expert Faculty</p>
                <p className="course-description">{course.description}</p>
                <div className="course-meta">
                  <span className="rating">
                    <i className="fas fa-star"></i> {course.rating}
                  </span>
                  <span className="duration">
                    <i className="fas fa-clock"></i> {course.duration}
                  </span>
                </div>
                {/* <div className="course-footer">
                  <div className="course-price">
                    {geoCountry === 'IN'
                      ? '₹' + course.price.toLocaleString()
                      : '$' + course.price_doller.toLocaleString()}
                  </div>
                  <Link className="btn-enroll" to={`/enroll?course=${course.id}&country=${geoCountry}`}>
                    Enroll Now
                  </Link>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

