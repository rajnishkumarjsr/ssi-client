import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { courseCatalog } from '../../data/courses.js';
import { getUser } from '../../service/authService.js';
import { FALLBACK_USD_TO_INR_RATE, getGeoLocation, getUsdToInrRate } from '../../utils/getGeo.js';

function Description({ value }) {
    if (Array.isArray(value)) {
        return (
            <ul>
                {value.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        );
    }

    return <p>{value}</p>;
}

function Section({ title, children }) {
    if (!title && !children) {
        return null;
    }

    return (
        <>
            {title ? <h3>{title}</h3> : null}
            {title ? <hr className="course-detail-divider" /> : null}
            {children}
        </>
    );
}

export default function CourseDetailPage({ courseId, panelPrefix, programName, tabContent, variant = 'default', selectableFees = false }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const selectedCourseKey = searchParams.get('id') || '';
    const [geoCountry, setGeoCountry] = useState('US');
    const [activeTab, setActiveTab] = useState('online');
    const [usdToInrRate, setUsdToInrRate] = useState(FALLBACK_USD_TO_INR_RATE);
    const [selectedFees, setSelectedFees] = useState({});
    const [selectedOneOnOneFees, setSelectedOneOnOneFees] = useState({});
    const [showSelfLearningPopup, setShowSelfLearningPopup] = useState(false);;

    const course = useMemo(() => {
        return (
            courseCatalog.find((item) => item.id === selectedCourseKey) ||
            courseCatalog.find((item) => item.id === courseId) ||
            null
        );
    }, [courseId, selectedCourseKey]);

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
        let isMounted = true;

        const fetchRate = async () => {
            const liveRate = await getUsdToInrRate();

            if (isMounted) {
                setUsdToInrRate(liveRate);
            }
        };

        fetchRate();

        return () => {
            isMounted = false;
        };
    }, []);

    const formatFeeAmount = (amount) => {
        if (geoCountry === 'IN') {
            return `Rs. ${amount.toLocaleString('en-IN')}`;
        }

        return `$${Math.round(amount / usdToInrRate).toLocaleString('en-US')}`;
    };

    const formatFeeLine = ({ label, amount, oneOnOneAmount }) => {
        const oneOnOneText = oneOnOneAmount
            ? ` (One-on-One ${formatFeeAmount(oneOnOneAmount)})`
            : '';

        return `${label} ${formatFeeAmount(amount)}${oneOnOneText}`;
    };

    const currentTab = tabContent[activeTab];
    const showCourseDetails = activeTab === 'online';
    const enrollmentCourseId = course?.id || courseId;
    const isGmatPage = variant === 'gmat';
    const shouldRenderSelectableFees = isGmatPage || selectableFees;

    const getFeeKey = (tabKey, item, index, type = 'fee') => `${tabKey}-${type}-${index}-${item.label}`;

    const renderFeeList = (items) => (
        <ul>
            {items.map((item) => (
                <li key={item.label}>{formatFeeLine(item)}</li>
            ))}
        </ul>
    );

    const getCompleteCourseKeys = (tabKey, items, type = 'fee') => {
        const completeCourseIndex = items.findIndex((item) => item.label.toLowerCase().includes('complete course'));

        if (completeCourseIndex < 0) {
            return { feeKey: null, oneOnOneKey: null };
        }

        const completeCourseItem = items[completeCourseIndex];

        return {
            feeKey: getFeeKey(tabKey, completeCourseItem, completeCourseIndex, type),
            oneOnOneKey: getFeeKey(tabKey, completeCourseItem, completeCourseIndex, `${type}-one-on-one`),
        };
    };

    const renderSelectableFeeList = (tabKey, items, type = 'fee', completeCourseKeys = getCompleteCourseKeys(tabKey, items, type)) => {
        const completeCourseIndex = type === 'fee'
            ? items.findIndex((item) => item.label.toLowerCase().includes('complete course'))
            : -1;
        const isCompleteCourseSelected = completeCourseKeys.feeKey
            ? Boolean(selectedFees[completeCourseKeys.feeKey]) || Boolean(selectedOneOnOneFees[completeCourseKeys.oneOnOneKey])
            : false;

        const handleFeeChange = (key, checked, isCompleteCourse, oneOnOneKey) => {
            if (isCompleteCourse && checked) {
                setSelectedFees((current) => {
                    const next = { ...current };
                    Object.keys(next).forEach((selectedKey) => {
                        if (selectedKey.startsWith(`${tabKey}-`)) {
                            next[selectedKey] = false;
                        }
                    });
                    next[key] = true;
                    return next;
                });
                setSelectedOneOnOneFees((current) => {
                    const next = { ...current };
                    Object.keys(next).forEach((selectedKey) => {
                        if (selectedKey.startsWith(`${tabKey}-`)) {
                            next[selectedKey] = false;
                        }
                    });
                    return next;
                });
                return;
            }

            setSelectedFees((current) => ({
                ...current,
                [key]: checked,
            }));
        };

        const handleOneOnOneChange = (key, checked, isCompleteCourse, feeKey) => {
            if (isCompleteCourse && checked) {
                setSelectedFees((current) => {
                    const next = { ...current };
                    Object.keys(next).forEach((selectedKey) => {
                        if (selectedKey.startsWith(`${tabKey}-`)) {
                            next[selectedKey] = false;
                        }
                    });
                    next[feeKey] = false;
                    return next;
                });
                setSelectedOneOnOneFees((current) => {
                    const next = { ...current };
                    Object.keys(next).forEach((selectedKey) => {
                        if (selectedKey.startsWith(`${tabKey}-`)) {
                            next[selectedKey] = false;
                        }
                    });
                    next[key] = true;
                    return next;
                });
                return;
            }

            setSelectedOneOnOneFees((current) => ({
                ...current,
                [key]: checked,
            }));
        };

        return (
            <ul className="course-fee-select-list">
                {items.map((item, index) => {
                    const feeKey = getFeeKey(tabKey, item, index, type);
                    const oneOnOneKey = getFeeKey(tabKey, item, index, `${type}-one-on-one`);
                    const isCompleteCourse = index === completeCourseIndex;
                    const isDisabledByCompleteCourse = isCompleteCourseSelected && !isCompleteCourse;

                    return (
                        <li key={feeKey} className="course-fee-select-item">
                            <label className="course-fee-checkbox">
                                <input
                                    type="checkbox"
                                    checked={Boolean(selectedFees[feeKey])}
                                    disabled={isDisabledByCompleteCourse}
                                    onChange={(event) => handleFeeChange(feeKey, event.target.checked, isCompleteCourse, oneOnOneKey)}
                                />
                                <span>{`${item.label} ${formatFeeAmount(item.amount)}`}</span>
                            </label>

                            {item.oneOnOneAmount ? (
                                <label className="course-fee-checkbox course-fee-checkbox-secondary">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(selectedOneOnOneFees[oneOnOneKey])}
                                        disabled={isDisabledByCompleteCourse}
                                        onChange={(event) => handleOneOnOneChange(oneOnOneKey, event.target.checked, isCompleteCourse, feeKey)}
                                    />
                                    <span>{`One-on-One ${formatFeeAmount(item.oneOnOneAmount)}`}</span>
                                </label>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        );
    };

    const renderFeeSections = (content, tabKey) => (
        <>
            <Section title={content.feeTitle}>
                {shouldRenderSelectableFees ? renderSelectableFeeList(tabKey, content.fee) : renderFeeList(content.fee)}
            </Section>

            {content.SectionFee ? (
                <>
                    <br />
                    <Section title={content.SectionTitle}>
                        {shouldRenderSelectableFees
                            ? renderSelectableFeeList(tabKey, content.SectionFee, 'section-fee', getCompleteCourseKeys(tabKey, content.fee))
                            : renderFeeList(content.SectionFee)}
                    </Section>
                </>
            ) : null}
        </>
    );

    const hasSelectedCourseFee = (tabKey) =>
        Object.entries(selectedFees).some(([key, isSelected]) => key.startsWith(`${tabKey}-`) && isSelected) ||
        Object.entries(selectedOneOnOneFees).some(([key, isSelected]) => key.startsWith(`${tabKey}-`) && isSelected);

    const getEnrollmentAmount = (amount) => (geoCountry === 'IN' ? amount : Math.round(amount / usdToInrRate));

    const buildEnrollmentSelection = (tabKey) => {
        const content = tabContent[tabKey];
        const selectedItems = [];

        const addSelectedItems = (items, type = 'fee') => {
            items?.forEach((item, index) => {
                const feeKey = getFeeKey(tabKey, item, index, type);
                const oneOnOneKey = getFeeKey(tabKey, item, index, `${type}-one-on-one`);

                if (selectedFees[feeKey]) {
                    selectedItems.push({
                        label: item.label,
                        amount: getEnrollmentAmount(item.amount),
                    });
                }

                if (selectedOneOnOneFees[oneOnOneKey]) {
                    selectedItems.push({
                        label: `${item.label} - One-on-One`,
                        amount: getEnrollmentAmount(item.oneOnOneAmount),
                    });
                }
            });
        };

        addSelectedItems(content.fee);
        addSelectedItems(content.SectionFee, 'section-fee');

        return {
            courseId: enrollmentCourseId,
            programName,
            tab: tabKey,
            country: geoCountry,
            currency: geoCountry === 'IN' ? 'INR' : 'USD',
            items: selectedItems,
            totalAmount: selectedItems.reduce((total, item) => total + item.amount, 0),
        };
    };

    const handleSelectedEnroll = (tabKey, enrollType) => {
        if (!getUser()) {
            navigate('/login');
            return;
        }

        if (!hasSelectedCourseFee(tabKey)) {
            window.alert('Please select at least one course');
            return;
        }

        const selection = buildEnrollmentSelection(tabKey);
        sessionStorage.setItem('courseEnrollmentSelection', JSON.stringify(selection));
        sessionStorage.setItem('gmatEnrollmentSelection', JSON.stringify(selection));

        navigate(`/enroll?course=${enrollmentCourseId}&country=${geoCountry}&type=${enrollType}`, {
            state: { courseEnrollmentSelection: selection, gmatEnrollmentSelection: selection },
        });
    };

    // const renderPracticeMaterial = () => {
    //     const practiceMaterial = tabContent.PracticeMaterial;

    //     if (Array.isArray(practiceMaterial.description)) {
    //         return (
    //             <Section title={practiceMaterial.title}>
    //                 <ul>
    //                     {practiceMaterial.description.map((item) => (
    //                         <li key={item}>{item}</li>
    //                     ))}
    //                     {practiceMaterial.fee ? <li>{formatFeeLine(practiceMaterial.fee)}</li> : null}
    //                 </ul>
    //             </Section>
    //         );
    //     }

    //     return (
    //         <Section title={practiceMaterial.title}>
    //             <Description value={practiceMaterial.description} />
    //             {practiceMaterial.fee ? <p>{formatFeeLine(practiceMaterial.fee)}</p> : null}
    //         </Section>
    //     );
    // };

    const renderPracticeMaterial = () => {
    const practiceMaterial = tabContent.PracticeMaterial;

    if (Array.isArray(practiceMaterial.description)) {
        const practiceData = practiceMaterial.description[0];

        return (
            <Section title={practiceMaterial.title}>

                {/* Free Practice */}
                {Array.isArray(practiceData.freePractice) && (
                    <>
                        <h4>Free Practice</h4>
                        <ul>
                            {practiceData.freePractice.map((item, index) => (
                                <li key={`free-${index}`} style={{ marginLeft: "40px" }}>{item}</li>
                            ))}
                        </ul>
                    </>
                )}

                {/* Purchased Practice */}
                {Array.isArray(practiceData.purchasedPractice) && (
                    <>
                        {practiceMaterial?.title1 && <h4>{practiceMaterial?.title1}</h4>}

                        <ul>
                            {practiceData.purchasedPractice.map((item, index) => (
                                <li key={`purchased-${index}`} style={{ marginLeft: "40px" }}>{item}</li>
                            ))}
                        </ul>
                    </>
                )}

                {practiceMaterial.fee ? (
                    <p>{formatFeeLine(practiceMaterial.fee)}</p>
                ) : null}

            </Section>
        );
    }

    // Fallback for normal text description
    return (
        <Section title={practiceMaterial.title}>
            <Description value={practiceMaterial.description} />
            {practiceMaterial.fee ? (
                <p>{formatFeeLine(practiceMaterial.fee)}</p>
            ) : null}
        </Section>
    );
};

    const renderTabContent = (tabKey, enrollType) => {
        const content = tabContent[tabKey];
        const isGmatLayout = isGmatPage;

        return (
            <>
                <Section title={content.title}>
                    <Description value={content.description} />
                </Section>

                {content.oneOnoneTitle || content.oneOnone ? (
                    <>
                        <br />
                        <Section title={content.oneOnoneTitle}>
                            <p>{content.oneOnone}</p>
                        </Section>
                    </>
                ) : null}

                <br />

                {isGmatLayout ? (
                    <>
                        {renderPracticeMaterial()}
                        <br />
                        {renderFeeSections(content, tabKey)}
                    </>
                ) : (
                    <>
                        {renderPracticeMaterial()}
                        <br />
                        {renderFeeSections(content, tabKey)}
                    </>
                )}

                <hr className="course-detail-divider-top" />
                <br />

                {shouldRenderSelectableFees ? (
                    <button type="button" className="btn-enroll" onClick={() => handleSelectedEnroll(tabKey, enrollType)}>
                        Enroll Now
                    </button>
                ) : (
                    <Link className="btn-enroll" to={`/enroll?course=${enrollmentCourseId}&country=${geoCountry}&type=${enrollType}`}>
                        Enroll Now
                    </Link>
                )}
            </>
        );
    };

    


    return (
        <main>
            <section className="course-detail">
                <div className="course-detail-tabs" role="tablist" aria-label={`${programName} programs`}>
                    <button
                        type="button"
                        className={`course-detail-tab ${activeTab === 'online' ? 'is-active' : ''}`}
                        role="tab"
                        id={`${panelPrefix}-online-tab`}
                        aria-selected={activeTab === 'online'}
                        aria-controls={`${panelPrefix}-online-panel`}
                        onClick={() => setActiveTab('online')}
                    >
                        Online
                    </button>
                    <button
                        type="button"
                        className={`course-detail-tab ${activeTab === 'selfLearning' ? 'is-active' : ''}`}
                        role="tab"
                        id={`${panelPrefix}-self-learning-tab`}
                        aria-selected={activeTab === 'selfLearning'}
                        aria-controls={`${panelPrefix}-self-learning-panel`}
                        onClick={() => setActiveTab('selfLearning')}
                    >
                        Self Learning
                    </button>

                    <button
                        type="button"
                        className="course-detail-tab self-learning-flash"
                        role="tab"
                        id={`${panelPrefix}-online-tab`}
                        aria-selected={activeTab === "online"}
                        aria-controls={`${panelPrefix}-online-panel`}
                        onClick={() => setShowSelfLearningPopup(true)}
                    >
                        Free Diagnostic
                    </button>
                </div>

                {showSelfLearningPopup && (
                    <div className="self-learning-popup">
                        <div className="self-learning-popup-content">
                            <button
                                type="button"
                                className="popup-close"
                                onClick={() => setShowSelfLearningPopup(false)}
                            >
                                ×
                            </button>

                            <h4>Free Diagnostic</h4>

                            <p>
                                Why diagnostic test?
                                <div style={{ textAlign: "left" }}>
                                    <p>To evaluate your ability in skills tested.</p>
                                    <p>To identify your areas of strength.</p>
                                    <p>To identify the area[s] to train.</p>
                                    <p>To economize your preparation.</p>
                                </div>
                            </p>

                            <button
                                type="button"
                                onClick={() => {
                                    setShowSelfLearningPopup(false);
                                    setActiveTab("online");
                                }}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                )}


                <div className="course-detail-grid">
                    <div className="course-detail-image course-detail-image-top-left">
                        <img src={currentTab.image} alt={currentTab.imageAlt} />
                    </div>
                    <div className="course-detail-content">
                        <div
                            role="tabpanel"
                            id={`${panelPrefix}-online-panel`}
                            aria-labelledby={`${panelPrefix}-online-tab`}
                            hidden={!showCourseDetails}
                        >
                            {renderTabContent('online', 'OL')}
                        </div>
                        <div
                            role="tabpanel"
                            id={`${panelPrefix}-self-learning-panel`}
                            aria-labelledby={`${panelPrefix}-self-learning-tab`}
                            hidden={showCourseDetails}
                        >
                            {renderTabContent('selfLearning', 'SL')}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
