import { tabContent } from '../../data/gredata.js';
import CourseDetailPage from './CourseDetailPage.jsx';

export default function Gre() {
    return (
        <CourseDetailPage
            courseId="gre"
            panelPrefix="gre"
            programName="GRE"
            tabContent={tabContent}
            selectableFees
        />
    );
}
