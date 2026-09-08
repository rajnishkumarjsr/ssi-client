import { tabContent } from '../../data/ieltsdata.js';
import CourseDetailPage from './CourseDetailPage.jsx';

export default function Ielts() {
    return (
        <CourseDetailPage
            courseId="ielts"
            panelPrefix="ielts"
            programName="IELTS"
            tabContent={tabContent}
            selectableFees
        />
    );
}
