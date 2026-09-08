import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser } from '../service/authService.js';

const registeredCoursesURL =
  'https://oqbptm5xbl.execute-api.us-east-1.amazonaws.com/prod/register-course';
const apiKey = '08FLFuexFsWfnFj6uTVjaCZsq4GHfgN7zTA2BG36';

const getCourseValue = (course, keys, fallback = '') => {
  for (const key of keys) {
    if (course?.[key]) {
      return course[key];
    }
  }

  return fallback;
};

const formatCoursePrice = (price) => {
  if (!price && price !== 0) {
    return '-';
  }

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice)) {
    return price;
  }

  return numericPrice;

  // return numericPrice.toLocaleString('en-US', {
  //   style: 'currency',
  //   currency: 'USD',
  //   maximumFractionDigits: 0
  // });
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => getUser());
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [coursesError, setCoursesError] = useState('');

  useEffect(() => {
    const user = getUser();
    setCurrentUser(user);

    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!currentUser) return;

    const email = typeof currentUser === 'string' ? '' : currentUser?.email || '';

    if (!email) {
      setRegisteredCourses([]);
      setIsLoadingCourses(false);
      setCoursesError('No email found for the logged in user.');
      return;
    }

    let isMounted = true;

    const fetchRegisteredCourses = async () => {
      setIsLoadingCourses(true);
      setCoursesError('');

      try {
        const url = new URL(registeredCoursesURL);
        url.searchParams.set('email', email);

        const response = await fetch(url.toString(), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey
          }
        });

        if (!response.ok) {
          throw new Error('Failed to load registered courses');
        }

        const data = await response.json();
        const courses = Array.isArray(data)
          ? data
          : data?.courses || data?.registeredCourses || data?.items || [];

        if (isMounted) {
          setRegisteredCourses(courses);
        }
      } catch (error) {
        if (isMounted) {
          setRegisteredCourses([]);
          setCoursesError(error?.message || 'Failed to load registered courses');
        }
      } finally {
        if (isMounted) {
          setIsLoadingCourses(false);
        }
      }
    };

    fetchRegisteredCourses();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  const studentName =
    typeof currentUser === 'string'
      ? currentUser
      : currentUser?.name || currentUser?.username || currentUser?.email || 'Student';

  return (
    <main>
      <section className="dashboard">
        <div className="dashboard-header">
          <h1>Welcome, {studentName}!</h1>
          <p>Continue your learning journey and track your progress</p>
        </div>



        <div className="dashboard-section">
          <h2>Registered Courses</h2>
          <div className="current-courses">
            {isLoadingCourses ? (
              <div className="registered-courses-card">
                <p className="registered-courses-message">Loading registered courses...</p>
              </div>
            ) : coursesError ? (
              <div className="registered-courses-card">
                <div className="alert alert-error">{coursesError}</div>
              </div>
            ) : registeredCourses.length ? (
              <div className="registered-courses-card">
                <div className="registered-courses-list-header">
                  <span>Course</span>
                  <span>Registered Date</span>
                  <span>Price</span>
                  {/* <span>Course Type</span> */}
                  {/* <span>Status</span> */}
                </div>

                <div className="registered-courses-list">
                  {registeredCourses.map((course, index) => {
                    const title = getCourseValue(
                      course,
                      ['name', 'courseName', 'course', 'title'],
                      'Registered Course'
                    );
                    // const registeredDate = getCourseValue(
                    //   course,
                    //   ['reg_date', 'registeredDate', 'registrationDate'],
                    //   '-'
                    // );
                    const registeredDate = getCourseValue(
                      course,
                      ['reg_date'],
                      '-'
                    );
                    const price = getCourseValue(course, ['price', 'amount', 'fee'], '');

                    const courseType = getCourseValue(
                      course,
                      ['course_type'],
                      '-'
                    );

                    return (
                      <div
                        className="registered-course-row"
                        key={course.id || course.courseId || `${title}-${index}`}
                      >
                        <div className="registered-course-name">
                          <i className={course.iconClass || course.icon || 'fas fa-book-open'}></i>
                          <strong>{title}</strong>
                        </div>
                        <span>{registeredDate}</span>
                        <span>{formatCoursePrice(price)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="registered-courses-card">
                <p className="registered-courses-message">No registered courses found.</p>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Learning Schedule</h2>
          <div className="learning-calendar">
            <div className="calendar-header">
              <button className="calendar-nav" type="button">
                &lt;
              </button>
              <h3>Week of December 4-10, 2023</h3>
              <button className="calendar-nav" type="button">
                &gt;
              </button>
            </div>
            <div className="calendar-grid">
              <div className="calendar-day">
                <div className="day-header">Mon</div>
                <div className="day-content">
                  <div className="study-session completed">
                    <span>JavaScript</span>
                    <small>30 min</small>
                  </div>
                </div>
              </div>
              <div className="calendar-day">
                <div className="day-header">Tue</div>
                <div className="day-content">
                  <div className="study-session completed">
                    <span>Python</span>
                    <small>45 min</small>
                  </div>
                </div>
              </div>
              <div className="calendar-day">
                <div className="day-header">Wed</div>
                <div className="day-content">
                  <div className="study-session scheduled">
                    <span>UI/UX</span>
                    <small>60 min</small>
                  </div>
                </div>
              </div>
              <div className="calendar-day">
                <div className="day-header">Thu</div>
                <div className="day-content">
                  <div className="study-session scheduled">
                    <span>JavaScript</span>
                    <small>30 min</small>
                  </div>
                </div>
              </div>
              <div className="calendar-day">
                <div className="day-header">Fri</div>
                <div className="day-content">
                  <div className="study-session">
                    <span>Python</span>
                    <small>45 min</small>
                  </div>
                </div>
              </div>
              <div className="calendar-day weekend">
                <div className="day-header">Sat</div>
                <div className="day-content">
                  <div className="rest-day">Rest Day</div>
                </div>
              </div>
              <div className="calendar-day weekend">
                <div className="day-header">Sun</div>
                <div className="day-content">
                  <div className="study-session">
                    <span>Review</span>
                    <small>90 min</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Achievements</h2>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-medal"></i>
              </div>
              <div className="achievement-info">
                <h4>Course Completed</h4>
                <p>Finished "HTML & CSS Basics"</p>
                <small>2 days ago</small>
              </div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-fire"></i>
              </div>
              <div className="achievement-info">
                <h4>7-Day Streak</h4>
                <p>Studied for 7 consecutive days</p>
                <small>1 week ago</small>
              </div>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="achievement-info">
                <h4>Perfect Score</h4>
                <p>100% on JavaScript Quiz #3</p>
                <small>3 days ago</small>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/programs" className="action-card">
              <i className="fas fa-search"></i>
              <h4>Browse Courses</h4>
              <p>Discover new learning opportunities</p>
            </Link>
            <a href="#" className="action-card">
              <i className="fas fa-calendar-plus"></i>
              <h4>Schedule Study</h4>
              <p>Plan your learning sessions</p>
            </a>
            <a href="#" className="action-card">
              <i className="fas fa-users"></i>
              <h4>Join Discussion</h4>
              <p>Connect with fellow learners</p>
            </a>
            <a href="#" className="action-card">
              <i className="fas fa-download"></i>
              <h4>Download Materials</h4>
              <p>Access offline resources</p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
