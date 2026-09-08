import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { tabContent } from '../../data/satdata.js';
import { courseCatalog } from '../../data/courses.js';
import { getUser } from '../../service/authService.js';
import { FALLBACK_USD_TO_INR_RATE, getGeoLocation, getUsdToInrRate } from '../../utils/getGeo.js';

function Description({ value }) {
    if (Array.isArray(value)) {
        return <ul>{value.map((item) => <li key={item}>{item}</li>)}</ul>;
    }

    return <p>{value}</p>;
}

function Section({ title, children }) {
    if (!title && !children) return null;

    return <>{title ? <h3>{title}</h3> : null}{title ? <hr className="course-detail-divider" /> : null}{children}</>;
}

export default function Sat() {

    const navigate = useNavigate();
        const [searchParams] = useSearchParams();
        const selectedCourseKey = searchParams.get('id') || '';
        const [geoCountry, setGeoCountry] = useState('US');
        const [activeTab, setActiveTab] = useState('online');
        const [usdToInrRate, setUsdToInrRate] = useState(FALLBACK_USD_TO_INR_RATE);
        const [selectedFees, setSelectedFees] = useState({});
        const [selectedOneOnOneFees, setSelectedOneOnOneFees] = useState({});
        const [showSelfLearningPopup, setShowSelfLearningPopup] = useState(false);
    
        const course = useMemo(() => (
            courseCatalog.find((item) => item.id === selectedCourseKey) ||
            courseCatalog.find((item) => item.id === 'sat') ||
            null
        ), [selectedCourseKey]);
    
        useEffect(() => {
            let isMounted = true;
            getGeoLocation().then((data) => {
                if (isMounted) setGeoCountry(data?.country || 'US');
            }).catch(() => {
                if (isMounted) setGeoCountry('US');
            });
            return () => { isMounted = false; };
        }, []);
    
        useEffect(() => {
            let isMounted = true;
            getUsdToInrRate().then((liveRate) => {
                if (isMounted) setUsdToInrRate(liveRate);
            });
            return () => { isMounted = false; };
        }, []);
    
        const formatFeeAmount = (amount) => (
            geoCountry === 'IN'
                ? `Rs. ${amount.toLocaleString('en-IN')}`
                : `$${Math.round(amount / usdToInrRate).toLocaleString('en-US')}`
        );
        const getFeeKey = (tabKey, item, index, type = 'fee') => `${tabKey}-${type}-${index}-${item.label}`;
    
        const getCompleteCourseKeys = (tabKey, items, type = 'fee') => {
            const completeCourseIndex = items.findIndex((item) => item.label.toLowerCase().includes('complete course'));
            if (completeCourseIndex < 0) return { feeKey: null, oneOnOneKey: null };
            const item = items[completeCourseIndex];
            return {
                feeKey: getFeeKey(tabKey, item, completeCourseIndex, type),
                oneOnOneKey: getFeeKey(tabKey, item, completeCourseIndex, `${type}-one-on-one`),
            };
        };
    
        const clearTabSelections = (tabKey, setter, selectedKey, value = false) => {
            setter((current) => {
                const next = { ...current };
                Object.keys(next).forEach((key) => {
                    if (key.startsWith(`${tabKey}-`)) next[key] = false;
                });
                if (selectedKey) next[selectedKey] = value;
                return next;
            });
        };
    
        const renderSelectableFeeList = (tabKey, items, type = 'fee') => {
            const completeCourseKeys = getCompleteCourseKeys(tabKey, items, type);
            const completeCourseIndex = type === 'fee'
                ? items.findIndex((item) => item.label.toLowerCase().includes('complete course'))
                : -1;
            const isCompleteCourseSelected = completeCourseKeys.feeKey && (
                selectedFees[completeCourseKeys.feeKey] || selectedOneOnOneFees[completeCourseKeys.oneOnOneKey]
            );
    
            return (
                <ul className="course-fee-select-list">
                    {items.map((item, index) => {
                        const feeKey = getFeeKey(tabKey, item, index, type);
                        const oneOnOneKey = getFeeKey(tabKey, item, index, `${type}-one-on-one`);
                        const isCompleteCourse = index === completeCourseIndex;
                        const isDisabled = isCompleteCourseSelected && !isCompleteCourse;
    
                        const selectFee = (checked) => {
                            if (isCompleteCourse && checked) {
                                clearTabSelections(tabKey, setSelectedFees, feeKey, true);
                                clearTabSelections(tabKey, setSelectedOneOnOneFees);
                                return;
                            }
                            setSelectedFees((current) => ({ ...current, [feeKey]: checked }));
                        };
    
                        const selectOneOnOne = (checked) => {
                            if (isCompleteCourse && checked) {
                                clearTabSelections(tabKey, setSelectedFees, feeKey, false);
                                clearTabSelections(tabKey, setSelectedOneOnOneFees, oneOnOneKey, true);
                                return;
                            }
                            setSelectedOneOnOneFees((current) => ({ ...current, [oneOnOneKey]: checked }));
                        };
    
                        return (
                            <li key={feeKey} className="course-fee-select-item">
                                <label className="course-fee-checkbox">
                                    <input type="checkbox" checked={Boolean(selectedFees[feeKey])} disabled={isDisabled} onChange={(event) => selectFee(event.target.checked)} />
                                    <span>{`${item.label} ${formatFeeAmount(item.amount)}`}</span>
                                </label>
                                {item.oneOnOneAmount ? (
                                    <label className="course-fee-checkbox course-fee-checkbox-secondary">
                                        <input type="checkbox" checked={Boolean(selectedOneOnOneFees[oneOnOneKey])} disabled={isDisabled} onChange={(event) => selectOneOnOne(event.target.checked)} />
                                        <span>{`One-on-One ${formatFeeAmount(item.oneOnOneAmount)}`}</span>
                                    </label>
                                ) : null}
                            </li>
                        );
                    })}
                </ul>
            );
        };

        const handlePracticeMaterialEnroll = (material) => {
            if (!getUser()) return navigate('/login');

            const amount = geoCountry === 'IN'
                ? material.amount
                : Math.round(material.amount / usdToInrRate);
            const selection = {
                courseId: course?.id || 'sat',
                programName: 'SAT',
                tab: 'materials',
                country: geoCountry,
                currency: geoCountry === 'IN' ? 'INR' : 'USD',
                items: [{ label: material.label, amount }],
                totalAmount: amount,
            };

            sessionStorage.setItem('courseEnrollmentSelection', JSON.stringify(selection));
            sessionStorage.setItem('satEnrollmentSelection', JSON.stringify(selection));
            navigate(`/enroll?course=${selection.courseId}&country=${geoCountry}&type=PM`, {
                state: { courseEnrollmentSelection: selection, satEnrollmentSelection: selection },
            });
        };
    
        const renderPracticeMaterial = () => {
            const practiceMaterial = tabContent.PracticeMaterial;
            if (Array.isArray(practiceMaterial.description)) {
                const practiceData = practiceMaterial.description[0];
                return (
                    <Section title={practiceMaterial.title}>
                        {Array.isArray(practiceData.freePractice) ? <><h4>Free Practice</h4><ul>{practiceData.freePractice.map((item, index) => <li key={`free-${index}`} style={{ marginLeft: '40px' }}>{item}</li>)}</ul></> : null}
                        {Array.isArray(practiceData.purchasedPractice) ? <><h4>{practiceMaterial.title1}</h4><ul>{practiceData.purchasedPractice.map((item, index) => <li key={`purchased-${index}`} style={{ marginLeft: '40px' }}>{item}</li>)}</ul>{practiceData.purchasedPracticePrice ? <div className="practice-material-purchase"><strong>{`Price: ${formatFeeAmount(practiceData.purchasedPracticePrice.amount)}`}</strong><button type="button" className="btn-enroll" onClick={() => handlePracticeMaterialEnroll(practiceData.purchasedPracticePrice)}>Buy Now</button></div> : null}</> : null}
                        {Array.isArray(practiceData.purchasedPractice1) ? <><h4>{practiceMaterial.title2}</h4><ul>{practiceData.purchasedPractice1.map((item, index) => <li key={`purchased1-${index}`} style={{ marginLeft: '40px' }}>{item}</li>)}</ul>{practiceData.purchasedPractice1Price ? <div className="practice-material-purchase"><strong>{`Price: ${formatFeeAmount(practiceData.purchasedPractice1Price.amount)}`}</strong><button type="button" className="btn-enroll" onClick={() => handlePracticeMaterialEnroll(practiceData.purchasedPractice1Price)}>Buy Now</button></div> : null}</> : null}
                    </Section>
                );
            }
            return <Section title={practiceMaterial.title}><Description value={practiceMaterial.description} /></Section>;
        };
    
        const hasSelectedCourseFee = (tabKey) => (
            Object.entries(selectedFees).some(([key, selected]) => key.startsWith(`${tabKey}-`) && selected) ||
            Object.entries(selectedOneOnOneFees).some(([key, selected]) => key.startsWith(`${tabKey}-`) && selected)
        );
    
        const buildEnrollmentSelection = (tabKey) => {
            const selectedItems = [];
            tabContent[tabKey].fee.forEach((item, index) => {
                const feeKey = getFeeKey(tabKey, item, index);
                const oneOnOneKey = getFeeKey(tabKey, item, index, 'fee-one-on-one');
                if (selectedFees[feeKey]) {
                    selectedItems.push({ label: item.label, amount: geoCountry === 'IN' ? item.amount : Math.round(item.amount / usdToInrRate) });
                }
                if (selectedOneOnOneFees[oneOnOneKey]) {
                    selectedItems.push({ label: `${item.label} - One-on-One`, amount: geoCountry === 'IN' ? item.oneOnOneAmount : Math.round(item.oneOnOneAmount / usdToInrRate) });
                }
            });
            return {
                courseId: course?.id || 'sat', programName: 'SAT', tab: tabKey, country: geoCountry,
                currency: geoCountry === 'IN' ? 'INR' : 'USD', items: selectedItems,
                totalAmount: selectedItems.reduce((total, item) => total + item.amount, 0),
            };
        };
    
        const handleSelectedEnroll = (tabKey, enrollType) => {
            if (!getUser()) return navigate('/login');
            if (!hasSelectedCourseFee(tabKey)) return window.alert('Please select at least one course');
            const selection = buildEnrollmentSelection(tabKey);
            sessionStorage.setItem('courseEnrollmentSelection', JSON.stringify(selection));
            sessionStorage.setItem('satEnrollmentSelection', JSON.stringify(selection));
            navigate(`/enroll?course=${selection.courseId}&country=${geoCountry}&type=${enrollType}`, {
                state: { courseEnrollmentSelection: selection, satEnrollmentSelection: selection },
            });
        };
    
        const renderTabContent = (tabKey, enrollType) => {
            const content = tabContent[tabKey];
            return (
                <>
                    <Section title={content.title}><Description value={content.description} /></Section>
                    {content.oneOnoneTitle || content.oneOnone ? <><br /><Section title={content.oneOnoneTitle}><p>{content.oneOnone}</p></Section></> : null}
                    <br />
                    <Section title={content.feeTitle}>{renderSelectableFeeList(tabKey, content.fee)}</Section>
                    <hr className="course-detail-divider-top" />
                    <br />
                    <button type="button" className="btn-enroll" onClick={() => handleSelectedEnroll(tabKey, enrollType)}>Enroll Now</button>
                </>
            );
        };
    
        const currentTab = tabContent[activeTab] || tabContent.online;
    
        return (
            <main>
                <section className="course-detail">
                    <div className="course-detail-tabs" role="tablist" aria-label="SAT programs">
                        <button type="button" className={`course-detail-tab ${activeTab === 'online' ? 'is-active' : ''}`} role="tab" id="sat-online-tab" aria-selected={activeTab === 'online'} aria-controls="sat-online-panel" onClick={() => setActiveTab('online')}>Online</button>
                        <button type="button" className={`course-detail-tab ${activeTab === 'selfLearning' ? 'is-active' : ''}`} role="tab" id="sat-self-learning-tab" aria-selected={activeTab === 'selfLearning'} aria-controls="sat-self-learning-panel" onClick={() => setActiveTab('selfLearning')}>Self Learning</button>
                        <button type="button" className={`course-detail-tab ${activeTab === 'materials' ? 'is-active' : ''}`} role="tab" id="sat-materials-tab" aria-selected={activeTab === 'materials'} aria-controls="sat-materials-panel" onClick={() => setActiveTab('materials')}>Materials</button>
                        <button type="button" className="course-detail-tab self-learning-flash" onClick={() => setShowSelfLearningPopup(true)}>Free Diagnostic</button>
                    </div>
    
                    {showSelfLearningPopup ? (
                        <div className="self-learning-popup">
                            <div className="self-learning-popup-content">
                                <button type="button" className="popup-close" aria-label="Close" onClick={() => setShowSelfLearningPopup(false)}>x</button>
                                <h4>Free Diagnostic</h4>
                                <div>
                                    <p>Why diagnostic test?</p>
                                    <div style={{ textAlign: 'left' }}>
                                        <p>To evaluate your ability in skills tested.</p>
                                        <p>To identify your areas of strength.</p>
                                        <p>To identify the area[s] to train.</p>
                                        <p>To economize your preparation.</p>
                                    </div>
                                </div>
                                <button type="button" onClick={() => { setShowSelfLearningPopup(false); setActiveTab('online'); }}>Continue</button>
                            </div>
                        </div>
                    ) : null}
    
                    <div className="course-detail-grid">
                        <div className="course-detail-image course-detail-image-top-left">
                            <img src={currentTab.image} alt={currentTab.imageAlt} />
                        </div>
                        <div className="course-detail-content">
                            <div role="tabpanel" id="sat-online-panel" aria-labelledby="sat-online-tab" hidden={activeTab !== 'online'}>{renderTabContent('online', 'OL')}</div>
                            <div role="tabpanel" id="sat-self-learning-panel" aria-labelledby="sat-self-learning-tab" hidden={activeTab !== 'selfLearning'}>{renderTabContent('selfLearning', 'SL')}</div>
                            <div role="tabpanel" id="sat-materials-panel" aria-labelledby="sat-materials-tab" hidden={activeTab !== 'materials'}>{renderPracticeMaterial()}</div>
                        </div>
                    </div>
                </section>
            </main>
        );
}
