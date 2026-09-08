import { tabContent } from '../../data/satdata.js';
import CourseDetailPage from './CourseDetailPage.jsx';

export default function Sat() {
    return (
        <CourseDetailPage
            courseId="sat"
            panelPrefix="sat"
            programName="SAT"
            tabContent={tabContent}
            selectableFees
        />
    );
}
