import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { enrollableCourses } from '../data/courses.js';
import { getUser } from '../service/authService.js';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  course: '',
  batch: '',
  education: '',
  target_date: '',
  experience: ''
};

const REGISTER_COURSE_URL =
  'https://oqbptm5xbl.execute-api.us-east-1.amazonaws.com/prod/register-course';
const MAX_REGISTER_COURSE_ID_URL =
  'https://oqbptm5xbl.execute-api.us-east-1.amazonaws.com/prod/register-course/max-id';
const API_KEY = '08FLFuexFsWfnFj6uTVjaCZsq4GHfgN7zTA2BG36';

const getNextCourseId = (data) => {
  const source = Array.isArray(data) ? data[0] : data;
  const idValue =
    source?.max_id?.id ??
    source?.maxId?.id ??
    source?.id?.id ??
    source?.max_id ??
    source?.maxId ??
    source?.id ??
    0;
  const numericId = Number(idValue);

  return Number.isFinite(numericId) ? numericId + 1 : 1;
};

const getRegistrationDate = () => new Date().toISOString().slice(0, 10);

export default function Enroll() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const selectedCourseKey = searchParams.get('course') || '';
  const selectedcountry = searchParams.get('country') || '';
  const selectedCourType = searchParams.get('type') || '';

  let courseTypeName = '';

  switch (selectedCourType) {
    case 'SL':
      courseTypeName = 'Self Learning';
      break;
    case 'OL':
      courseTypeName = 'Online Learning';
      break;
    default:
      courseTypeName = '';
  }
  
  const courseInfo = enrollableCourses[selectedCourseKey] || null;
  const courseEnrollmentSelection = useMemo(() => {
    const selectionFromState = location.state?.courseEnrollmentSelection || location.state?.gmatEnrollmentSelection;
    if (selectionFromState?.items?.length) {
      return selectionFromState;
    }

    try {
      const savedSelection = JSON.parse(
        sessionStorage.getItem('courseEnrollmentSelection') ||
          sessionStorage.getItem('gmatEnrollmentSelection') ||
          'null'
      );
      return savedSelection?.courseId === selectedCourseKey && savedSelection?.items?.length ? savedSelection : null;
    } catch {
      return null;
    }
  }, [location.state, selectedCourseKey]);

  const [currentUser, setCurrentUser] = useState(() => getUser());
  const [formData, setFormData] = useState(() => {
    const user = getUser();
    const name =
      typeof user === 'string' ? user : user?.name || user?.username || '';
    const email = typeof user === 'string' ? '' : user?.email || '';
    const phone = typeof user === 'string' ? '' : user?.mobile || user?.phone || '';

    return {
      ...initialForm,
      name,
      email,
      phone
    };
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const coursesList = useMemo(() => Object.entries(enrollableCourses), []);
  const showSelectedEnrollment = Boolean(courseEnrollmentSelection);
  const formatEnrollmentAmount = (amount, currency = courseEnrollmentSelection?.currency) => {
    if (currency === 'INR' || selectedcountry === 'IN') {
      return `Rs. ${amount.toLocaleString('en-IN')}`;
    }

    return `$${amount.toLocaleString('en-US')}`;
  };

  useEffect(() => {
    const user = getUser();
    setCurrentUser(user);
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!currentUser) return;
    const name =
      typeof currentUser === 'string'
        ? currentUser
        : currentUser?.name || currentUser?.username || '';
    const email =
      typeof currentUser === 'string' ? '' : currentUser?.email || '';
    const phone =
      typeof currentUser === 'string'
        ? ''
        : currentUser?.mobile || currentUser?.phone || '';

    setFormData((prev) => ({
      ...prev,
      name: prev.name || name,
      email: prev.email || email,
      phone: prev.phone || phone
    }));
  }, [currentUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildSelectedCourses = () => {
    if (courseEnrollmentSelection?.items?.length) {
      return courseEnrollmentSelection.items.map((item) => ({
        course: item.label,
        price: item.amount
      }));
    }

    return [
      {
        course: courseInfo?.name || selectedCourseKey,
        price: selectedcountry === 'IN' ? courseInfo?.price : courseInfo?.price_doller
      }
    ];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.name && formData.email && formData.phone && selectedCourseKey) {
      setIsSubmitting(true);
      setMessage({ type: '', text: '' });

      try {
        const maxIdResponse = await fetch(MAX_REGISTER_COURSE_ID_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
          }
        });

        if (!maxIdResponse.ok) {
          throw new Error('Unable to get the latest enrollment ID.');
        }

        const maxIdData = await maxIdResponse.json();
        const nextId = getNextCourseId(maxIdData);
        const regDate = getRegistrationDate();
        const selectedCourses = buildSelectedCourses();

        for (const [index, selectedCourse] of selectedCourses.entries()) {
          const response = await fetch(REGISTER_COURSE_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key': API_KEY
            },
            body: JSON.stringify({
              id: nextId + index,
              name: formData.name,
              email: formData.email,
              mobile: formData.phone,
              course: selectedCourse.course,
              reg_date: regDate,
              price: selectedCourse.price,
              course_type: courseTypeName,
              course_start_date: '',
              course_status: 'In Progress'
            })
          });

          if (!response.ok) {
            throw new Error(`Failed to save ${selectedCourse.course}.`);
          }
        }

        setMessage({
          type: 'success',
          text: 'Enrollment successful! Your selected course registration has been saved.'
        });
        const name =
          typeof currentUser === 'string'
            ? currentUser
            : currentUser?.name || currentUser?.username || '';
        const email =
          typeof currentUser === 'string' ? '' : currentUser?.email || '';
        const phone =
          typeof currentUser === 'string'
            ? ''
            : currentUser?.mobile || currentUser?.phone || '';
        setFormData({
          ...initialForm,
          name,
          email,
          phone
        });

        navigate('/dashboard');
      } catch (error) {
        setMessage({
          type: 'error',
          text: error?.message || 'Enrollment failed. Please try again.'
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <main>
      <section className="enrollment-section">
        <div className="enrollment-container">
          <h1>Program Enrollment</h1>

          {!courseInfo ? (
            <div className="course-selection">
              <h2>Select a Program</h2>
              <div className="courses-grid">
                {coursesList.map(([key, course]) => (
                  <div className="course-card" key={key}>
                    <h3>{course.name}</h3>
                    <p className="price">
                      {
                        selectedcountry === 'IN'
                          ? '₹' + course.price.toLocaleString()
                          : '$' + course.price_doller.toLocaleString()
                        //course.price.toLocaleString()
                       }
                    </p>
                    <p className="duration">{course.duration}</p>
                    <Link to={`/enroll?course=${key}`} className="btn-select">
                      Select Program
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="enrollment-form-container">
              <div className="course-summary">
                <h2>{courseInfo.name} - {courseTypeName}</h2>
                {showSelectedEnrollment ? (
                  <div className="summary-contact-fields">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ) : null}
                <div className={`course-details${showSelectedEnrollment ? ' course-details-gmat-selected' : ''}`}>
                  <p>
                    <strong>Duration:</strong> {courseInfo.duration}
                  </p>
                  <p>
                    <strong>Fee: </strong> 
                      {
                        selectedcountry === 'IN'
                          ? '₹' + courseInfo.price.toLocaleString()
                          : '$' + courseInfo.price_doller.toLocaleString()
                        //courseInfo.price.toLocaleString()
                      }
                  </p>
                  {showSelectedEnrollment ? (
                    <div className="selected-course-summary">
                      <h3>Selected Courses ({courseTypeName})</h3>
                      <ul>
                        {courseEnrollmentSelection.items.map((item) => (
                          <li key={`${item.label}-${item.amount}`}>
                            <span>{item.label}</span>
                            <strong>{formatEnrollmentAmount(item.amount, courseEnrollmentSelection.currency)}</strong>
                          </li>
                        ))}
                      </ul>
                      <p className="selected-course-total">
                        <strong>Total Amount:</strong>{' '}
                        {formatEnrollmentAmount(courseEnrollmentSelection.totalAmount, courseEnrollmentSelection.currency)}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>

              {message.text ? (
                <div
                  className={`alert ${
                    message.type === 'success' ? 'alert-success' : 'alert-error'
                  }`}
                >
                  {message.text}
                </div>
              ) : null}

              <form className="enrollment-form" onSubmit={handleSubmit}>
                <input type="hidden" name="course" value={selectedCourseKey} />

                {!showSelectedEnrollment ? (
                  <>
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                ) : null}

                {/* <div className="form-group">
                  <label htmlFor="education">Educational Background</label>
                  <select
                    id="education"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                  >
                    <option value="">Select your background</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                    <option value="postgraduate">Post Graduate</option>
                    <option value="working">Working Professional</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="batch">Preferred Batch *</label>
                  <select
                    id="batch"
                    name="batch"
                    required
                    value={formData.batch}
                    onChange={handleChange}
                  >
                    <option value="">Select batch timing</option>
                    <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="evening">Evening (6:00 PM - 9:00 PM)</option>
                    <option value="weekend">Weekend (Sat-Sun)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="target_date">Target Exam Date</label>
                  <input
                    type="date"
                    id="target_date"
                    name="target_date"
                    value={formData.target_date}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Previous Test Experience</label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <option value="">Select experience level</option>
                    <option value="first_time">First time taking the test</option>
                    <option value="retake">Retaking the test</option>
                    <option value="multiple">Multiple attempts</option>
                  </select>
                </div> */}

                {!showSelectedEnrollment ? (
                <div className="payment-info">
                  <h3>Payment Information</h3>
                  {courseEnrollmentSelection ? (
                    <p>
                      <strong>Total Fee:</strong>{' '}
                      {formatEnrollmentAmount(courseEnrollmentSelection.totalAmount, courseEnrollmentSelection.currency)}
                    </p>
                  ) : (
                    <>
                      <p>
                        <strong>Total Fee:</strong> ?{courseInfo.price.toLocaleString()}
                      </p>
                      <p>
                        <strong>Registration Fee:</strong> ?2,000 (Pay now)
                      </p>
                      <p>
                        <strong>Remaining Fee:</strong> ?
                        {(courseInfo.price - 2000).toLocaleString()} (Pay after confirmation)
                      </p>
                    </>
                  )}
                </div>
                ) : null}

                <button type="submit" className="btn-enroll" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving Enrollment...' : 'Complete Enrollment'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
