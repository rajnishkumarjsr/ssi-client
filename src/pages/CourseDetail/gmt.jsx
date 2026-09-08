import { tabContent } from '../../data/gmtdata.js';
import CourseDetailPage from './CourseDetailPage.jsx';

export default function GmatOnline() {
    return (
        <CourseDetailPage
            courseId="gmat"
            panelPrefix="gmat"
            programName="GMAT"
            tabContent={tabContent}
            variant="gmat"
        />
    );
}
